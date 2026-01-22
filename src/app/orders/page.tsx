'use client';

import { useMemo } from 'react';
import type { Order } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Loader2 } from 'lucide-react';
import { useUser, useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, Timestamp } from 'firebase/firestore';

export default function OrdersPage() {
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const ordersQuery = useMemo(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'orders'), orderBy('date', 'desc'));
  }, [user, firestore]);

  const { data: orders, loading: ordersLoading } = useCollection<Order>(ordersQuery);

  if (userLoading || ordersLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8">
        Your Orders
      </h1>
      
      {!orders || orders.length === 0 ? (
        <div className="text-center py-20">
          <History className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-2 text-lg font-medium text-muted-foreground">No order history</h2>
          <p className="mt-1 text-sm text-muted-foreground">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {orders.map((order) => (
            <AccordionItem value={order.id} key={order.id} className="border-b-0">
              <Card>
                <CardHeader className="p-0">
                  <AccordionTrigger className="flex justify-between p-6">
                    <div>
                      <h3 className="text-lg font-medium">Order #{order.id.slice(-6)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.date ? (order.date as unknown as Timestamp).toDate().toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <p className="text-lg font-medium">${order.total.toFixed(2)}</p>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                  <CardContent>
                    <ul className="divide-y divide-border">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
