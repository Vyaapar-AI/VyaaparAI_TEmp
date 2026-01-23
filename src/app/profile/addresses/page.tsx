
'use client';

import { useAuth } from '@/hooks/use-auth';
import type { Address } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Plus, Trash2, Edit, Home, Star } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAddresses, addAddress, updateAddress, deleteAddress } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddressForm } from '@/components/AddressForm';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddressesPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { data: addresses, isLoading: addressesLoading, error } = useQuery<Address[], Error>({
    queryKey: ['addresses', token],
    queryFn: () => getAddresses(token!),
    enabled: !!user && !!token,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/profile/addresses');
    }
  }, [user, authLoading, router]);

  const handleMutationSuccess = (message: string) => {
    toast({ title: message });
    queryClient.invalidateQueries({ queryKey: ['addresses'] });
    setIsDialogOpen(false);
    setEditingAddress(null);
  };

  const handleMutationError = (error: any, defaultMessage: string) => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: error.message || defaultMessage,
    });
  };

  const addAddressMutation = useMutation({
    mutationFn: (values: Omit<Address, 'id' | 'isDefault'>) => addAddress({ address: values, token: token! }),
    onSuccess: () => handleMutationSuccess('Address added successfully!'),
    onError: (error) => handleMutationError(error, 'Could not add address.'),
  });

  const updateAddressMutation = useMutation({
    mutationFn: (values: Address) => updateAddress({ address: values, token: token! }),
    onSuccess: () => handleMutationSuccess('Address updated successfully!'),
    onError: (error) => handleMutationError(error, 'Could not update address.'),
  });

  const deleteAddressMutation = useMutation({
    mutationFn: (addressId: string) => deleteAddress({ addressId, token: token! }),
    onSuccess: () => handleMutationSuccess('Address deleted successfully!'),
    onError: (error) => handleMutationError(error, 'Could not delete address.'),
  });
  
  const handleSetDefaultMutation = useMutation({
    mutationFn: (address: Address) => updateAddress({ address: { ...address, isDefault: true }, token: token! }),
    onSuccess: () => handleMutationSuccess('Default address updated!'),
    onError: (error) => handleMutationError(error, 'Could not set default address.'),
  });

  const handleFormSubmit = (values: any) => {
    if (editingAddress) {
      updateAddressMutation.mutate({ ...values, id: editingAddress.id });
    } else {
      addAddressMutation.mutate(values);
    }
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    setIsDialogOpen(true);
  }
  
  const openAddDialog = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  }

  if (authLoading || addressesLoading) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  if (!user) {
      return (
          <div className="flex justify-center items-center h-screen">
               <div className="text-center">
                  <h1 className="text-2xl font-bold">Please log in</h1>
                  <p className="text-muted-foreground">You need to be logged in to manage your addresses.</p>
                  <Button asChild className="mt-4"><Link href="/login?redirect=/profile/addresses">Log In</Link></Button>
              </div>
          </div>
      )
  }

  if (error) {
    return <div className="text-center py-20 text-destructive">{error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline flex items-center gap-3">
          <MapPin className="h-8 w-8 text-primary" />
          My Addresses
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" /> Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAddress ? 'Edit Address' : 'Add a New Address'}</DialogTitle>
            </DialogHeader>
            <AddressForm
              initialData={editingAddress}
              onSubmit={handleFormSubmit}
              isPending={addAddressMutation.isPending || updateAddressMutation.isPending}
              submitButtonText={editingAddress ? 'Save Changes' : 'Add Address'}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {addresses && addresses.length === 0 ? (
         <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <Home className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold text-muted-foreground">No saved addresses</h2>
            <p className="mt-2 text-base text-muted-foreground">Add an address to make checkout faster.</p>
             <Button className="mt-6" onClick={openAddDialog}>Add Your First Address</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses?.map((address) => (
            <Card key={address.id} className={cn("flex flex-col", address.isDefault && "border-primary ring-2 ring-primary")}>
              <CardHeader className="flex flex-row justify-between items-start pb-2">
                <div>
                  <CardTitle className="text-lg">{address.name}</CardTitle>
                </div>
                {address.isDefault && <div className="flex items-center gap-1 text-sm font-semibold text-primary"><Star className="h-4 w-4 fill-current" /> Default</div>}
              </CardHeader>
              <CardContent className="flex-grow text-muted-foreground space-y-1">
                <p>{address.phone}</p>
                <p>{address.address}</p>
                <p>{address.city}, {address.postalCode}</p>
              </CardContent>
              <div className="flex items-center justify-end gap-2 p-4 pt-0">
                {!address.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefaultMutation.mutate(address)} disabled={handleSetDefaultMutation.isPending}>
                       Set as Default
                    </Button>
                )}
                <Button variant="outline" size="sm" onClick={() => openEditDialog(address)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this address.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteAddressMutation.mutate(address.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
