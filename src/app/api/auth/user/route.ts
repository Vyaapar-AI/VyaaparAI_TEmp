import { NextResponse, NextRequest } from 'next/server';
import { getDbForStore } from '@/lib/api';
import type { User } from '@/lib/types';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
    const storeId = request.nextUrl.searchParams.get('store_id');
    if (!storeId) {
      return NextResponse.json({ message: 'Store ID is required' }, { status: 400, headers: corsHeaders });
    }
    const db = getDbForStore(storeId);
    
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return NextResponse.json(null, { status: 401, headers: corsHeaders });
    }

    const userId = db.tokens[token];
    if (!userId) {
        return NextResponse.json(null, { status: 401, headers: corsHeaders });
    }
    
    const userInDb = db.users.find(u => u.uid === userId);

    if (!userInDb) {
        return NextResponse.json(null, { status: 404, headers: corsHeaders });
    }

    const user: User = {
        uid: userInDb.uid,
        email: userInDb.email,
        name: userInDb.name,
        role: userInDb.role,
        createdAt: userInDb.createdAt,
        termsAcceptedAt: userInDb.termsAcceptedAt,
    };

    return NextResponse.json(user, { headers: corsHeaders });
}
