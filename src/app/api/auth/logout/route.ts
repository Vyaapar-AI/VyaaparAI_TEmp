import { NextResponse } from 'next/server';
import { db } from '@/lib/api';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (token && db.tokens[token]) {
    delete db.tokens[token];
  }

  return NextResponse.json({ message: 'Logged out' }, { headers: corsHeaders });
}
