'use client';

import { useAuth } from '@/hooks/use-auth';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { History, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/lib/api';

export default function OrdersPage() {
  const { user, token, isLoading: authLoading } = useAuth();

  const { data: orders, isLoading: ordersLoading, error } = useQuery<Order[], Error>({
    queryKey: ['orders', token],
    queryFn: () => getOrders(token!),
    enabled: !!user && !!token,
  });

  if (authLoading || ordersLoading) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!user) {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center py-20">
                <History className="mx-auto h-12 w-12 text-muted-foreground" />
                <h2 className="mt-2 text-lg font-medium text-muted-foreground">Please log in</h2>
                <p className="mt-1 text-sm text-muted-foreground">You need to be logged in to see your order history.</p>
                <Button asChild className="mt-4">
                    <Link href="/login?redirect=/orders">Log In</Link>
                </Button>
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-destructive">{error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8">
        Your Orders
      </h1>
      
      {orders && orders.length === 0 ? (
         <div className="text-center py-20">
            <History className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-2 text-lg font-medium text-muted-foreground">No order history</h2>
            <p className="mt-1 text-sm text-muted-foreground">You haven't placed any orders yet.</p>
             <Button asChild className="mt-4">
                <Link href="/">Continue Shopping</Link>
            </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle>Order #{order.id.slice(-6)}</CardTitle>
                  <CardDescription>Date: {format(new Date(order.date), "PPP")}</CardDescription>
                </div>
                <div className="text-lg font-bold font-price">₹{order.total.toFixed(2)}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                       <p className="text-sm font-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
