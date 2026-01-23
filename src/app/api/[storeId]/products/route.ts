import { NextResponse, NextRequest } from 'next/server';
import { productData, BusinessType } from '@/lib/products-data';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest, { params }: { params: { storeId: string } }) {
  const { searchParams } = new URL(request.url);
  const businessType = searchParams.get('businessType') as BusinessType;

  if (!businessType || !(businessType in productData)) {
    return NextResponse.json({ message: 'Invalid or missing businessType' }, { status: 400, headers: corsHeaders });
  }

  const products = productData[businessType];
  
  return NextResponse.json(products, { headers: corsHeaders });
}
