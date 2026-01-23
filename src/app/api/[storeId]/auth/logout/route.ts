import { NextResponse, NextRequest } from 'next/server';
import { getDbForStore } from '@/lib/api';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest, { params }: { params: { storeId: string } }) {
  const { storeId } = params;
  if (!storeId) {
    return NextResponse.json({ message: 'Store ID is required' }, { status: 400, headers: corsHeaders });
  }
  const db = getDbForStore(storeId);

  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (token && db.tokens[token]) {
    delete db.tokens[token];
  }

  return NextResponse.json({ message: 'Logged out' }, { headers: corsHeaders });
}
