import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    const refreshToken = request.cookies.get('refresh_token')?.value;
    if (!refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        return await fetch(`${baseUrl}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({refresh: refreshToken}),
        });

    } catch (error) {
        console.error('Error during token refresh:', error);
        // Clear all auth cookies on any refresh error
        return NextResponse.json({message: 'Internal server error during token refresh'}, {status: 500});
    }
}
