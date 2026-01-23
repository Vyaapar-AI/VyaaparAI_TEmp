import { NextResponse, NextRequest } from 'next/server';
import { getDbForStore, type StoreDb } from '@/lib/api';
import type { Order, CartItem } from '@/lib/types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

function getUserIdFromToken(request: NextRequest, db: StoreDb): string | null {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return null;
    }

    return db.tokens[token] || null;
}

export async function GET(request: NextRequest) {
    const storeId = request.nextUrl.searchParams.get('store_id');

    if (!storeId) {
        return NextResponse.json({ message: 'Store ID is required' }, { status: 400, headers: corsHeaders });
    }
    const db = getDbForStore(storeId);
    const userId = getUserIdFromToken(request, db);

    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401, headers: corsHeaders });
    }
    
    const userOrders = db.orders[userId] || [];
    return NextResponse.json(userOrders, { headers: corsHeaders });
}


export async function POST(request: NextRequest) {
  const storeId = request.nextUrl.searchParams.get('store_id');
  if (!storeId) {
    return NextResponse.json({ message: 'Store ID is required' }, { status: 400, headers: corsHeaders });
  }
  const db = getDbForStore(storeId);
  const userId = getUserIdFromToken(request, db);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }

  try {
    const { items, total } = await request.json() as { items: CartItem[], total: number };

    if (!items || !total) {
        return NextResponse.json({ message: 'Missing order data' }, { status: 400, headers: corsHeaders });
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

    return NextResponse.json(newOrder, { status: 201, headers: corsHeaders });

  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}
