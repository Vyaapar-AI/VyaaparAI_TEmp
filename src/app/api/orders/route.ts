import { NextResponse } from 'next/server';
import { db } from '@/lib/api';
import type { Order, CartItem } from '@/lib/types';

function getUserIdFromToken(request: Request): string | null {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return null;
    }

    return db.tokens[token] || null;
}

export async function GET(request: Request) {
    const userId = getUserIdFromToken(request);

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const userOrders = db.orders[userId] || [];
    return NextResponse.json(userOrders);
}


export async function POST(request: Request) {
  const userId = getUserIdFromToken(request);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { items, total } = await request.json() as { items: CartItem[], total: number };

    if (!items || !total) {
        return NextResponse.json({ message: 'Missing order data' }, { status: 400 });
    }

    const newOrder: Order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        items,
        total,
    };
    
    if (!db.orders[userId]) {
        db.orders[userId] = [];
    }
    db.orders[userId].push(newOrder);

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
