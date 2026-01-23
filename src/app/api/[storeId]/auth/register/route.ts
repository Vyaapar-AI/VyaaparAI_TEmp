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

export async function POST(request: NextRequest, { params }: { params: { storeId: string } }) {
  try {
    const { storeId } = params;
    if (!storeId) {
      return NextResponse.json({ message: 'Store ID is required' }, { status: 400, headers: corsHeaders });
    }
    const db = getDbForStore(storeId);

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400, headers: corsHeaders });
    }

    const existingUser = db.users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409, headers: corsHeaders });
    }

    const now = new Date().toISOString();
    const newUser: User & { password_DO_NOT_USE_IN_PROD: string } = {
      uid: `user_${Date.now()}`,
      name,
      email,
      role: 'user',
      createdAt: now,
      termsAcceptedAt: now,
      password_DO_NOT_USE_IN_PROD: password, // In production, hash and salt this password
    };

    db.users.push(newUser);

    const userForToken: User = {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      termsAcceptedAt: newUser.termsAcceptedAt,
    };

    // Generate a simple token. In production, use a library like 'jsonwebtoken'.
    const token = Buffer.from(JSON.stringify({ userId: newUser.uid, timestamp: Date.now() })).toString('base64');
    db.tokens[token] = newUser.uid;
    
    return NextResponse.json({ user: userForToken, token }, { status: 201, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500, headers: corsHeaders });
  }
}
