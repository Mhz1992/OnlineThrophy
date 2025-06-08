import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {verifyToken} from '@/src/lib/jwt'; // Updated import path

// Define public paths that do not require authentication
const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/api/auth/forgot-password',
    '/api/backend/auth/signup',
    '/api/backend/auth/login',
    '/api/auth/set-token-cookie', // NEW: Allow access to set token cookie
    '/api/auth/clear-token-cookie' // NEW: Allow access to clear token cookie
];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

    // Get the token from the cookie
    const token = request.cookies.get('token')?.value;

    let isAuthenticated = false;
    if (token) {
        // Attempt to verify the token. This assumes the token is a JWT and
        // the JWT_SECRET in your environment matches the one used by the external API.
        const decodedToken = verifyToken(token);
        if (decodedToken) {
            isAuthenticated = true;
        } else {
            // If token exists but is invalid/expired, clear the cookie and redirect
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('token'); // Clear the invalid cookie
            return response;
        }
    }
    console.log(isAuthenticated)

    if (isPublicPath) {
        // If it's a public path and user is authenticated, redirect to home
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        // Allow access to public paths if not authenticated
        return NextResponse.next();
    } else {
        // If it's a protected path
        if (!isAuthenticated) {
            // If not authenticated, redirect to login
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Allow access if authenticated
        return NextResponse.next();
    }
}

// Configure the matcher to apply middleware to specific paths
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - any files in the /public folder (e.g., /public/vercel.svg)
         * - /api/auth (handled explicitly in publicPaths)
         * - any file with a file extension (e.g., .js, .css, .png)
         */
        '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
    ],
};
