import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Import cookies from next/headers

export async function POST() {
    const cookieStore = await cookies(); // Get the cookies instance by awaiting the promise

    // Delete each token cookie by name
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('authToken'); // For backward compatibility

    return NextResponse.json({ message: 'Tokens cleared' }, { status: 200 });
}
