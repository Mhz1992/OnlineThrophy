import jwt from 'jsonwebtoken';

// Function to check if a JWT token is expired
export function isTokenExpired(token: string): boolean {
    try {
        // Decode the token without verification
        const decoded = jwt.decode(token) as { exp?: number };

        // If there's no expiration claim, consider it not expired
        if (!decoded || !decoded.exp) {
            return false;
        }

        // Check if the token is expired (exp is in seconds, Date.now() is in milliseconds)
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        // If there's an error decoding, consider it expired to be safe
        return true;
    }
}

// Function to refresh the access token using the refresh token
export async function refreshToken(refreshToken: string): Promise<{ access: string, refresh?: string } | null> {
    try {
        const baseUrl = process.env.BACKEND_CORE_URL || '/api/backend';
        const response = await fetch(`${baseUrl}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            console.error('Failed to refresh token:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}