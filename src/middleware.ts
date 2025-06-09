import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// Define public paths that do not require authentication
const publicPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/api/auth/forgot-password',
    '/api/backend/auth/signup',
    '/api/backend/auth/login',
    '/api/auth/set-token-cookie',
    '/api/auth/clear-token-cookie'
];

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));
    const token = request.cookies.get('token')?.value;
    let isAuthenticated = false;
    if (token) {
        isAuthenticated = true;
    }
    console.log(`Path: ${path}, Token present: ${!!token}, Is authenticated (middleware): ${isAuthenticated}`);

    if (isPublicPath) {
        if (isAuthenticated) {
            console.log(`Redirecting authenticated user from public path ${path} to /`);
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    } else {
        // If it's a protected path
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
