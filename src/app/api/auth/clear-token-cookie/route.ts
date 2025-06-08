import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request: NextRequest) {
    // Clear the token cookie by setting its maxAge to 0 and an empty value
    const cookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0, // Immediately expire the cookie
    });

    const response = NextResponse.json({ success: true, message: 'Token cookie cleared' });
    response.headers.set('Set-Cookie', cookie);
    return response;
}
