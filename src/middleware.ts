import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import { isTokenExpired, refreshToken } from '@/lib/authUtils';

// Define public paths that do not require authentication
const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/api/auth/set-token-cookie',
    '/api/auth/clear-token-cookie',
];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

    // Check for access token in cookies (primary) or token (for backward compatibility)
    const accessToken = request.cookies.get('accessToken')?.value;
    const legacyToken = request.cookies.get('token')?.value;
    const refreshTokenCookie = request.cookies.get('refreshToken')?.value;

    let isAuthenticated = false;
    let token = accessToken || legacyToken;

    // If we have a token, check if it's valid
    if (token) {
        // Check if the token is expired
        const expired = isTokenExpired(token);

        if (expired && refreshTokenCookie) {
            console.log('Token is expired, attempting to refresh');
            // Try to refresh the token
            const newTokens = await refreshToken(refreshTokenCookie);
            if (newTokens && newTokens.access) {
                // Update the token for this request
                token = newTokens.access;
                isAuthenticated = true;

                // Create a new response to add the updated cookies
                const response = NextResponse.next();

                // Set the new access token cookie
                response.cookies.set('accessToken', newTokens.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 60 * 60 * 24, // 1 day
                });

                // Set the legacy token cookie for backward compatibility
                response.cookies.set('token', newTokens.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 60 * 60 * 24, // 1 day
                });

                // If we got a new refresh token, update that cookie too
                if (newTokens.refresh) {
                    response.cookies.set('refreshToken', newTokens.refresh, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7, // 1 week
                    });
                    console.log("refreshToken cookie set with value: " + newTokens.refresh )
                }

                // Continue with the request
                console.log('Token refreshed successfully');

                // If it's a public path and we're authenticated, redirect to home
                if (isPublicPath) {
                    console.log(`Redirecting authenticated user from public path ${path} to /`);
                    return NextResponse.redirect(new URL('/', request.url));
                }

                return response;
            } else {
                console.log('Failed to refresh token');
                // If refresh failed, consider the user not authenticated
                isAuthenticated = false;
            }
        } else if (!expired) {
            // Token is valid
            isAuthenticated = true;
        }
    }

    console.log(`Path: ${path}, Token present: ${!!token}, Is authenticated (middleware): ${isAuthenticated}, Token expired: ${token ? isTokenExpired(token) : 'N/A'}`);

    // Handle public paths
    if (isPublicPath) {
        if (isAuthenticated) {
            console.log(`Redirecting authenticated user from public path ${path} to /`);
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    } 
    // Handle protected paths
    else {
        if (!isAuthenticated) {
            // If not authenticated, redirect to login
            console.log(`Redirecting unauthenticated user from protected path ${path} to /login`);
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Allow access if authenticated
        console.log(`Allowing access to protected path ${path} for authenticated user`);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
    ],
};
