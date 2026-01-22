'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export function UserNav() {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/login">
        <LogIn className="h-5 w-5" />
        <span className="sr-only">Log in</span>
      </Link>
    </Button>
  );
}
