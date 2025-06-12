import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
    const { access, refresh } = await request.json();

    if (!access) {
        return NextResponse.json({ message: 'Access token is required' }, { status: 400 });
    }

    // Create cookies array to hold all cookies
    const cookies = [];

    // Set the access token as an HTTP-only cookie
    cookies.push(serialize('accessToken', access, {
        httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
        sameSite: 'lax', // Protects against CSRF attacks
        path: '/', // Available across the entire application
        maxAge: 60 * 60 * 24, // 1 day (adjust as needed, should match JWT access token expiry)
    }));

    // For backward compatibility, also set the token cookie
    cookies.push(serialize('token', access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    }));

    // If refresh token is provided, set it as a separate HTTP-only cookie
    if (refresh) {
        cookies.push(serialize('refreshToken', refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week (refresh tokens typically have longer expiry)
        }));
    }

    const response = NextResponse.json({ success: true, message: 'Tokens set in cookies' });

    // Set all cookies in the response headers
    cookies.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
    });

    return response;
}
