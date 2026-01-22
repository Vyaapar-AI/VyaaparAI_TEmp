import type { Order, User } from './types';

// In a real application, you would use a database.
// This is an in-memory store for demonstration purposes.
interface DbUser extends User {
  password_DO_NOT_USE_IN_PROD: string;
}

const users: DbUser[] = [];

const orders: { [userId: string]: Order[] } = {};

// In-memory token store: { token: userId }
const tokens: Record<string, string> = {};


export const db = {
  users,
  orders,
  tokens,
};
