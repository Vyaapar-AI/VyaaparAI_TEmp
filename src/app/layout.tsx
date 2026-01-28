import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/hooks/use-cart';
import { WishlistProvider } from '@/hooks/use-wishlist';
import { AuthProvider } from '@/hooks/use-auth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from '@/components/Fallback';
import { ThemeProvider } from '@/components/ThemeProvider';
import { themeConfig } from '@/themes';
import { ThemeStyle } from '@/components/ThemeStyle';
import { QueryProvider } from '@/components/QueryProvider';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_STORE_NAME || 'My Store',
  description: process.env.NEXT_PUBLIC_STORE_DESCRIPTION || 'Welcome to my store!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'h-full bg-background font-body text-foreground antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeStyle theme={themeConfig} />
          <ErrorBoundary FallbackComponent={Fallback}>
            <QueryProvider>
              <Suspense>
                <AuthProvider>
                  <WishlistProvider>
                    <CartProvider>
                      <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">
                          {children}
                        </main>
                        <Footer />
                      </div>
                      <Toaster />
                    </CartProvider>
                  </WishlistProvider>
                </AuthProvider>
              </Suspense>
            </QueryProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
