import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Thank you for your order!</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Your order has been placed successfully. You will receive an email confirmation shortly.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  );
}
