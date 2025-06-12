import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    // Create cookies array to hold all cookies to be cleared
    const cookies = [];

    // Clear all token cookies by setting their maxAge to 0 and an empty value
    const cookieNames = ['token', 'accessToken', 'refreshToken'];

    cookieNames.forEach(name => {
        cookies.push(serialize(name, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 0, // Immediately expire the cookie
        }));
    });

    const response = NextResponse.json({ success: true, message: 'All token cookies cleared' });

    // Set all cleared cookies in the response headers
    cookies.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
    });

    return response;
}
