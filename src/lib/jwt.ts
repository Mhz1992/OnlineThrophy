import jwt from 'jsonwebtoken';

// JWT_SECRET should be an environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_please_change_this_in_production';

export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
}

export function verifyToken(token: string): { userId: string } | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error); // Log only if needed for debugging, avoid in production for security
        return null;
    }
}
