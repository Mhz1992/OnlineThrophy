import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, findUserByPhone, addUser } from '@/lib/server-auth'; // Corrected import path

export async function POST(request: NextRequest) {
    const { name, family, phone, password } = await request.json();

    if (!name || !family || !phone || !password) {
        return NextResponse.json({ message: 'All fields (name, family, phone, password) are required' }, { status: 400 });
    }

    if (findUserByPhone(phone)) {
        return NextResponse.json({ message: 'Phone number already registered' }, { status: 409 });
    }

    try {
        const passwordHash = await hashPassword(password);
        const newUser = addUser({ name, family, phone, passwordHash });

        // In a real app, you might generate a token here and require a separate login.
        return NextResponse.json({ message: 'User registered successfully', userId: newUser.id }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error during registration' }, { status: 500 });
    }
}
