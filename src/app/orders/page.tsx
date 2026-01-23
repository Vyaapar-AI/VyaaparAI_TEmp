'use client';

import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { History, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function OrdersPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;

  useEffect(() => {
    if (user && token) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          if (!storeId) {
            throw new Error('Store ID is not configured.');
          }
          const url = `${apiBaseUrl}/api/${storeId}/orders`;
          const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!res.ok) {
            throw new Error('Failed to fetch orders.');
          }
          const data = await res.json();
          setOrders(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
        setLoading(false);
    }
  }, [user, token, apiBaseUrl, storeId]);

  if (loading) {
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
    return <div className="text-center py-20 text-destructive">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8">
        Your Orders
      </h1>
      
      {orders.length === 0 ? (
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
          {orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle>Order #{order.id.slice(-6)}</CardTitle>
                  <CardDescription>Date: {format(new Date(order.date), "PPP")}</CardDescription>
                </div>
                <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                       <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
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
