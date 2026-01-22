import { NextResponse } from 'next/server';
import { db } from '@/lib/api';
import { cookies } from 'next/headers';
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
    id: userInDb.id,
    email: userInDb.email,
    displayName: userInDb.displayName,
  };
  
  // IMPORTANT: In a production app, use a secure session library like iron-session or next-auth.
  // Storing session data in a plain cookie is insecure.
  cookies().set('session', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return NextResponse.json(user);
}
