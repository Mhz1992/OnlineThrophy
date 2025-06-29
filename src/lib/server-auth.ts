import bcrypt from 'bcryptjs';
// This file contains Node.js-specific logic (bcrypt) and should only be imported by API routes.

export interface User {
    id: string;
    name: string;
    family: string;
    phone: string;
    passwordHash: string;
}

// In-memory "database" for demonstration purposes.
// In a real application, this would be replaced with a proper database.
const users: User[] = [];


export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function findUserByPhone(phone: string): User | undefined {
    return users.find(user => user.phone === phone);
}

export function addUser(user: Omit<User, 'id' | 'passwordHash'> & { passwordHash: string }): User {
    const newUser = { ...user, id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}` }; // Simple unique ID generation
    users.push(newUser);
    console.log('New user added:', newUser.phone);
    return newUser;
}
