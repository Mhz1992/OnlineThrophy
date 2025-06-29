import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { refresh } = await request.json();

        if (!refresh) {
            return NextResponse.json({ message: 'Refresh token is required' }, { status: 400 });
        }

        // Forward the refresh token request to the backend
        const baseUrl = process.env.BACKEND_CORE_URL || '/api/backend';
        const response = await fetch(`${baseUrl}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to refresh token' }));
            return NextResponse.json(errorData, { status: response.status });
        }

        // Get the new tokens from the response
        const data = await response.json();

        // Return the new tokens to the client
        return NextResponse.json(data);
    } catch (error) {
        console.error('Token refresh error:', error);
        return NextResponse.json({ message: 'An error occurred during token refresh' }, { status: 500 });
    }
}