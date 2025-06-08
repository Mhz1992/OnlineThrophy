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
    '/api/backend/auth/login'


    // Add any other public API routes or static assets here if needed
];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

    // Get the token from the cookie
    const token = request.cookies.get('token')?.value;

    if (isPublicPath) {
        // If it's a public path and a token exists, redirect authenticated users from login/register
        if (token && verifyToken(token)) {
            // User is authenticated and trying to access login/register, redirect to home
            return NextResponse.redirect(new URL('/', request.url));
        }
        // Allow access to public paths if not authenticated or no token
        return NextResponse.next();
    } else {
        // If it's a protected path
        if (!token || !verifyToken(token)) {
            // If no token or invalid token, redirect to login
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
