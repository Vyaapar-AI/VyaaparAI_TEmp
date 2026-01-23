import type { Order, User } from './types';

// In a real application, you would use a database.
// This is an in-memory store for demonstration purposes.
interface DbUser extends User {
  password_DO_NOT_USE_IN_PROD: string;
}

export interface StoreDb {
  users: DbUser[];
  orders: { [userId: string]: Order[] };
  tokens: Record<string, string>;
}

const stores: { [storeId: string]: StoreDb } = {};

const defaultStoreId = process.env.NEXT_PUBLIC_STORE_ID;
if (defaultStoreId && !stores[defaultStoreId]) {
    stores[defaultStoreId] = {
        users: [],
        orders: {},
        tokens: {},
    };
}


export function getDbForStore(storeId: string): StoreDb {
    if (!stores[storeId]) {
        stores[storeId] = {
            users: [],
            orders: {},
            tokens: {},
        };
    }
    return stores[storeId];
}
