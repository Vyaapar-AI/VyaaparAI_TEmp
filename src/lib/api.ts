import type { Order } from './types';

// In a real application, you would use a database.
// This is an in-memory store for demonstration purposes.
interface DbUser {
  id: string;
  email: string;
  displayName: string;
  password_DO_NOT_USE_IN_PROD: string; // Plain text password for demo
}

const users: DbUser[] = [
  {
    id: '1',
    email: 'user@example.com',
    displayName: 'Test User',
    password_DO_NOT_USE_IN_PROD: 'password123',
  },
];

const orders: { [userId: string]: Order[] } = {};

export const db = {
  users,
  orders,
};
