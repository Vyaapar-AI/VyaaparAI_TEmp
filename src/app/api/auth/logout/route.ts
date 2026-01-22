import { NextResponse } from 'next/server';
import { db } from '@/lib/api';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (token && db.tokens[token]) {
    delete db.tokens[token];
  }

  return NextResponse.json({ message: 'Logged out' });
}
