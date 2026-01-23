import { NextResponse } from 'next/server';
import { productData } from '@/lib/products-data';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  const allProducts = Object.values(productData).flat();
  return NextResponse.json(allProducts, { headers: corsHeaders });
}
