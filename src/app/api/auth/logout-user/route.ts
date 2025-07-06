import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;
    const accessToken = cookieStore.get('access_token')?.value;

    if (!refreshToken) {
        // If no refresh token, user is already logged out or session expired.
        // Clear any remaining auth cookies and redirect to login.
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
    }

    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        return await fetch(`${baseUrl}/api/auth/logout/`, {
            method: 'POST',
            body: JSON.stringify({refresh: refreshToken}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({message: 'Internal server error during logout'}, {status: 500});
    }
}
