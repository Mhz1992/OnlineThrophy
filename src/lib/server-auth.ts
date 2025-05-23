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

// Seed initial users
async function seedUsers() {
    if (users.length === 0) {
        const adminPasswordHash = await hashPassword('admin');
        users.push({
            id: 'admin-id',
            name: 'Admin',
            family: 'User',
            phone: '09123456789', // Example phone number for admin
            passwordHash: adminPasswordHash,
        });

        const userPasswordHash = await hashPassword('pass');
        users.push({
            id: 'user-id',
            name: 'Regular',
            family: 'User',
            phone: '09000000000', // Example phone number for regular user
            passwordHash: userPasswordHash,
        });
        console.log('Initial users seeded: admin:admin, user:pass');
    }
}
seedUsers(); // Call seed function on module load

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
