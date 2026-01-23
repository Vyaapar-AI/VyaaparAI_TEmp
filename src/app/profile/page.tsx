'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/profile');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const getInitials = (name?: string | null) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1 && names[0] && names[names.length - 1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-8">
         <User className="h-10 w-10 text-primary" />
         <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            My Profile
        </h1>
      </div>
     
      <div className="grid gap-8 md:grid-cols-3 items-start">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4 text-3xl">
                <AvatarImage src={''} alt={user.name || ''} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground text-center">
                    <p>Member since</p>
                    <p className="font-medium text-foreground">{format(new Date(user.createdAt), "PPP")}</p>
                </div>
                 <Button className="w-full mt-6" disabled>Edit Profile</Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>View and manage your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p className="font-semibold">{user.name}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                        <p className="font-semibold">{user.email}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">User Role</p>
                        <p className="font-semibold capitalize">{user.role}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-primary" />
                        My Addresses
                    </CardTitle>
                    <CardDescription>View and manage your shipping addresses for a faster checkout.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild><Link href="/profile/addresses">Manage Addresses</Link></Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
