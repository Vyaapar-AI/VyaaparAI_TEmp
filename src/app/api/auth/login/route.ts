import { NextResponse } from 'next/server';
import { db } from '@/lib/api';
import type { User } from '@/lib/types';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const userInDb = db.users.find((u) => u.email === email);

  // IMPORTANT: This is a demo and not secure. 
  // In a production application, you should hash and salt passwords.
  if (!userInDb || userInDb.password_DO_NOT_USE_IN_PROD !== password) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  
  const user: User = {
    uid: userInDb.uid,
    email: userInDb.email,
    name: userInDb.name,
    role: userInDb.role,
    createdAt: userInDb.createdAt,
    termsAcceptedAt: userInDb.termsAcceptedAt,
  };
  
  // Generate a simple token. In production, use a library like 'jsonwebtoken'.
  const token = Buffer.from(JSON.stringify({ userId: user.uid, timestamp: Date.now() })).toString('base64');
  db.tokens[token] = user.uid;

  return NextResponse.json({ user, token });
}
