import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/api';
import type { User, Order, CartItem } from '@/lib/types';

export async function GET() {
    const cookie = cookies().get('session');
    if (!cookie) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user: User = JSON.parse(cookie.value);
        const userOrders = db.orders[user.uid] || [];
        return NextResponse.json(userOrders);
    } catch (error) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}


export async function POST(request: Request) {
  const cookie = cookies().get('session');
  if (!cookie) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user: User = JSON.parse(cookie.value);
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
    
    if (!db.orders[user.uid]) {
        db.orders[user.uid] = [];
    }
    db.orders[user.uid].push(newOrder);

    return NextResponse.json(newOrder, { status: 201 });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
