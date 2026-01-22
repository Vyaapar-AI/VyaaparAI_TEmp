'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="container flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Sign In</CardTitle>
          <CardDescription>Authentication is currently not configured.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please contact the site administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
