import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/hooks/use-cart';
import { AuthProvider } from '@/hooks/use-auth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from '@/components/Fallback';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Bakery',
  description: 'Tasty & Spicy Baked Goods.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
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
          <ErrorBoundary FallbackComponent={Fallback}>
            <AuthProvider>
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
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
