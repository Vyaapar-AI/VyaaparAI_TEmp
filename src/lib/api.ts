import type { Order, User } from './types';

// In a real application, you would use a database.
// This is an in-memory store for demonstration purposes.
interface DbUser extends User {
  password_DO_NOT_USE_IN_PROD: string;
}

const now = new Date().toISOString();

const users: DbUser[] = [
  {
    uid: '1',
    email: 'user@example.com',
    name: 'Test User',
    role: 'user',
    createdAt: now,
    termsAcceptedAt: now,
    password_DO_NOT_USE_IN_PROD: 'password123',
  },
];

const orders: { [userId: string]: Order[] } = {};

// In-memory token store: { token: userId }
const tokens: Record<string, string> = {};


export const db = {
  users,
  orders,
  tokens,
};
