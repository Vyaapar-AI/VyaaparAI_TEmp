import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { User } from '@/lib/types';

export async function GET() {
  const cookie = cookies().get('session');
  if (!cookie) {
    return NextResponse.json(null);
  }

  try {
    const user: User = JSON.parse(cookie.value);
    return NextResponse.json(user);
  } catch (error) {
    // Invalid cookie, clear it
    cookies().delete('session');
    return NextResponse.json(null);
  }
}
