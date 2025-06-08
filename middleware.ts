import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
// import {verifyToken} from '@/src/lib/jwt'; // No longer needed for external JWT verification in middleware

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

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

    // Get the token from the cookie
    const token = request.cookies.get('token')?.value;

    let isAuthenticated = false;
    // If a token exists in the cookie, we assume the user is authenticated for middleware purposes.
    // The actual validation (expiry, signature) will be handled by the client-side apiClient
    // when making API calls, which will then trigger logout/redirection on 401/403.
    if (token) {
        isAuthenticated = true;
        // Removed verifyToken call as it cannot validate external JWTs with a local secret.
        // If you later control the backend and share the JWT_SECRET, you can re-introduce verification here.
    }
    console.log(`Path: ${path}, Token present: ${!!token}, Is authenticated (middleware): ${isAuthenticated}`);

    if (isPublicPath) {
        // If it's a public path and user is authenticated, redirect to home
        if (isAuthenticated) {
            console.log(`Redirecting authenticated user from public path ${path} to /`);
            return NextResponse.redirect(new URL('/', request.url));
        }
        // Allow access to public paths if not authenticated
        console.log(`Allowing access to public path ${path}`);
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
