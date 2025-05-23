import {NextRequest, NextResponse} from 'next/server';
import {findUserByPhone, comparePassword} from '@/lib/server-auth';
import {generateToken} from '@/lib/jwt';

export async function POST(request: NextRequest) {
    const {phone, password} = await request.json();

    if (!phone || !password) {
        return NextResponse.json({message: 'Phone and password are required'}, {status: 400});
    }

    const user = findUserByPhone(phone);

    if (!user) {
        return NextResponse.json({message: 'Invalid credentials'}, {status: 401});
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
        return NextResponse.json({message: 'Invalid credentials'}, {status: 401});
    }

    const token = generateToken(user.id);

    const response = NextResponse.json({message: 'Login successful', token}, {status: 200});

    // Set the token in a HttpOnly cookie for security
    // HttpOnly: Prevents client-side JavaScript from accessing the cookie.
    // Path=/: Makes the cookie available across the entire application.
    // SameSite=Lax: Provides a reasonable balance between security and usability for CSRF protection.
    // Max-Age: Cookie expiration in seconds (1 hour in this case).
    response.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
    });

    return response;
}
