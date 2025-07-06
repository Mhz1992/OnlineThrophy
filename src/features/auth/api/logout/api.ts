import {NextResponse} from "next/server";

export const logoutUserApi = async (): Promise<Response> => {

    const logoutResponse = await fetch(`${origin}/api/auth/logout-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent for refresh request
    });
    if (!logoutResponse.ok) {
        console.error('Server-side logout-user failed:', logoutResponse.status);
        return NextResponse.json({message: 'Internal server error during logout-user'}, {status: logoutResponse.status});
    }
    return NextResponse.json({message: 'Success logout-user'}, {status: logoutResponse.status});

};
