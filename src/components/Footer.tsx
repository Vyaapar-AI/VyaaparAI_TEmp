import Link from 'next/link';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

export function Footer() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'My Store';
  const storeDescription = process.env.NEXT_PUBLIC_STORE_DESCRIPTION || 'Handcrafted goods for a considered life, bringing beauty and intention to your daily rituals.';

  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              {storeDescription}
            </p>
          </div>
          
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                All Products
              </Link>
              <Link href="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                My Orders
              </Link>
            </nav>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/contact-us" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/terms-and-conditions" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/shipping-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipping Policy
              </Link>
              <Link href="/refund-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                Refund Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
