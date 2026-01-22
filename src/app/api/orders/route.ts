import { NextRequest, NextResponse } from 'next/server';

// In-memory store for orders (for demonstration purposes)
const orders: any[] = [
    {
        id: 'ord123',
        date: new Date('2023-10-26T10:00:00Z').toISOString(),
        total: 24.00,
        items: [
            { id: '1', name: 'Classic Croissant', price: 3.50, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1737700087841-f2bc25eb0b10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MHx8fHwxNzY5MDY2OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
            { id: '2', name: 'Assorted Macarons', price: 12.00, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1580421383318-f87fc861a696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYWNhcm9ucyUyMGRlc3NlcnR8ZW58MHx8fHwxNzY5MDk0NDA0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
            { id: '3', name: 'Vanilla Sprinkle Cupcake', price: 4.00, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwY3VwY2FrZXxlbnwwfHx8fDE3MjEwNzMyODR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        ]
    }
];

export async function GET(req: NextRequest) {
  // In a real app, you'd fetch this from a database based on the authenticated user
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const newOrder = await req.json();
  const orderWithId = { ...newOrder, id: `ord${Date.now()}`};
  // In a real app, you'd save this to a database
  orders.push(orderWithId);
  console.log('New order received:', orderWithId);
  return NextResponse.json({ message: 'Order received!', order: orderWithId }, { status: 201 });
}
