import { NextResponse } from 'next/server';
import { db } from '@/lib/api';
import type { User } from '@/lib/types';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Name, email, and password are required' }, { status: 400 });
  }

  const existingUser = db.users.find((u) => u.email === email);
  if (existingUser) {
    return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
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
  
  return NextResponse.json({ user: userForToken, token }, { status: 201 });
}
