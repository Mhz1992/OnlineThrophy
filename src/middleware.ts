import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {cookies} from "next/headers";

// Define public paths that do not require authentication
const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/api/auth/forgot-password',
    '/api/backend/auth/signup',
    '/api/backend/auth/login',
    '/api/auth/token/refresh', // Backend refresh endpoint
    '/api/auth/refresh-token' // New Next.js API route for refreshing cookies
];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('access_token')?.value
    const isAuthenticated = !!accessToken;

    console.log(`Path: ${path}, AccessToken present: ${!!accessToken}, Is authenticated (middleware): ${isAuthenticated}`);

    // Handle public paths
    if (isPublicPath) {
        if (isAuthenticated) {
            console.log(`Redirecting authenticated user from public path ${path} to /`);
            return NextResponse.redirect(new URL('/', request.url));
        }
        // If it's a public path and the user is not authenticated, allow access.
        return NextResponse.next();
    }
    // Handle protected paths
    else {
        if (!isAuthenticated) {
            const refreshToken = cookieStore.get("refresh_token")
            if (refreshToken) {
                return NextResponse.next();
            }
            // console.log(`Redirecting unauthenticated user from protected path ${path} to /login`);
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // Allow access if authenticated.
        // console.log(`Allowing access to protected path ${path} for authenticated user`);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        // Match all paths except:
        // - Next.js static files and images
        // - favicon.ico
        // - Specific /api/auth/* routes that manage cookies or are backend refresh endpoints
        //   (these are handled by the API routes themselves, not the middleware's auth logic)
        // - Other static assets (svg, png, etc.)
        '/((?!_next/static|_next/image|/icons/favicon.ico|/icons/*|api/auth/token/refresh|api/auth/refresh-token|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
    ],
};
