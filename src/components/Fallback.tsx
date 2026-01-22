'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Logo } from './Logo';

export function Fallback({ error, resetErrorBoundary }: {error: Error, resetErrorBoundary: () => void}) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="fixed top-8">
            <Logo />
        </div>
        <div role="alert" className="w-full max-w-2xl text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Something went wrong</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                We're sorry, but an unexpected error occurred. Please try again.
            </p>
            <pre className="mt-6 text-left text-sm text-muted-foreground bg-muted/50 p-4 rounded-md whitespace-pre-wrap overflow-x-auto">
                {error.message}
            </pre>
            <Button onClick={resetErrorBoundary} className="mt-8" variant="default" size="lg">
                Try again
            </Button>
        </div>
      </div>
    )
  }
