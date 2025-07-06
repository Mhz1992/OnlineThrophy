export const logoutUserApi = async (): Promise<Response> => {

    return await fetch(`${origin}/api/auth/logout-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent for refresh request
    })

};
