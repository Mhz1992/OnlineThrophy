import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";

export async function POST(request: NextRequest) {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value
    if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        const refreshResponse =  await fetch(`${baseUrl}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refresh: refreshToken}),
        });
        if (!refreshResponse.ok) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('access_token');
            response.cookies.delete('refresh_token');
            return response;
        }
        return refreshResponse;

    } catch (error) {
        console.error('Error during token refresh:', error);
        // Clear all auth cookies on any refresh error
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
    }
}
