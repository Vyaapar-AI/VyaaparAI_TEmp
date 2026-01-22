'use client';

import { History } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8">
        Your Orders
      </h1>
      
      <div className="text-center py-20">
        <History className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-2 text-lg font-medium text-muted-foreground">No order history</h2>
        <p className="mt-1 text-sm text-muted-foreground">You haven't placed any orders yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">Please log in to see your order history.</p>
      </div>
    </div>
  );
}
