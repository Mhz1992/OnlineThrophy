import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
    const { token } = await request.json();

    if (!token) {
        return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    // Set the token as an HTTP-only cookie
    const cookie = serialize('token', token, {
        httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
        secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
        sameSite: 'lax', // Protects against CSRF attacks
        path: '/', // Available across the entire application
        maxAge: 60 * 60 * 24 * 7, // 1 week (adjust as needed, should match JWT expiry)
    });

    const response = NextResponse.json({ success: true, message: 'Token set in cookie' });
    response.headers.set('Set-Cookie', cookie);
    return response;
}
