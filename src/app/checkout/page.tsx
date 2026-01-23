
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/use-cart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { placeOrder, getAddresses } from '@/lib/api';
import type { Address } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  postalCode: z.string().min(4, { message: 'Please enter a valid postal code.' }),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: addresses, isLoading: addressesLoading } = useQuery<Address[], Error>({
    queryKey: ['addresses', token],
    queryFn: () => getAddresses(token!),
    enabled: !!user && !!token,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    },
  });
  
  const placeOrderMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      if (!token) throw new Error('Authentication Error: You are not logged in.');
      if (cartItems.length === 0) throw new Error('Your cart is empty.');
      return placeOrder({ items: cartItems, total: cartTotal, shippingInfo: values, token });
    },
    onSuccess: () => {
      toast({
          title: 'Order Placed!',
          description: 'Thank you for your purchase.',
        });
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      router.push('/order-confirmation');
    },
    onError: (error: any) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message || 'Could not place your order.',
        });
    }
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }
    
    if (user && form.getValues('email') === '') {
      form.setValue('email', user.email || '');
    }

    if (addresses && addresses.length > 0) {
        const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];
        if (defaultAddress) {
            form.setValue('name', defaultAddress.name);
            form.setValue('phone', defaultAddress.phone);
            form.setValue('address', defaultAddress.address);
            form.setValue('city', defaultAddress.city);
            form.setValue('postalCode', defaultAddress.postalCode);
        }
    } else if (user) {
         form.setValue('name', user.name || '');
    }

  }, [user, authLoading, router, form, addresses]);
  
  useEffect(() => {
    if (!authLoading && cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems, authLoading, router]);

  const handleAddressSelect = (addressId: string) => {
    const selectedAddress = addresses?.find(a => a.id === addressId);
    if(selectedAddress) {
        form.setValue('name', selectedAddress.name);
        form.setValue('phone', selectedAddress.phone);
        form.setValue('address', selectedAddress.address);
        form.setValue('city', selectedAddress.city);
        form.setValue('postalCode', selectedAddress.postalCode);
        form.clearErrors();
    }
  }

  if (authLoading || !user || addressesLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (cartItems.length === 0) {
      return (
          <div className="flex justify-center items-center h-screen">
              <div className="text-center">
                  <h1 className="text-2xl font-bold">Your cart is empty.</h1>
                  <Button asChild className="mt-4"><Link href="/">Go Shopping</Link></Button>
              </div>
          </div>
      )
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    placeOrderMutation.mutate(values);
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          {addresses && addresses.length > 0 && (
             <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Select a Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup onValueChange={handleAddressSelect} defaultValue={addresses.find(a => a.isDefault)?.id || addresses[0]?.id}>
                    <div className="space-y-4">
                      {addresses.map(addr => (
                        <Label key={addr.id} htmlFor={addr.id} className="flex items-start space-x-3 p-4 border rounded-md cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                          <RadioGroupItem value={addr.id} id={addr.id} />
                          <div>
                            <p className="font-semibold">{addr.name}</p>
                            <div className="text-sm text-muted-foreground">
                              <p>{addr.phone}</p>
                              <p>{addr.address}, {addr.city}, {addr.postalCode}</p>
                            </div>
                          </div>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                  <p className="text-center my-4 text-sm text-muted-foreground">OR</p>
                </CardContent>
             </Card>
           )}
          <Card>
            <CardHeader>
              <CardTitle>{addresses && addresses.length > 0 ? 'Enter a New Address' : 'Enter Shipping Information'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input placeholder="you@example.com" {...field} disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 9876543210" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Anytown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full mt-4" disabled={placeOrderMutation.isPending}>
                    {placeOrderMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Place Order
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <span>{item.title} x {item.quantity}</span>
                    <span className="font-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-border flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="font-price">₹{cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
