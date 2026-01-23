import Link from 'next/link';

export function Footer() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'My Store';
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left text-sm text-secondary-foreground">
            &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-secondary-foreground/80">
            <Link href="/terms-and-conditions" className="hover:text-secondary-foreground transition-colors">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-secondary-foreground transition-colors">Privacy Policy</Link>
            <Link href="/shipping-policy" className="hover:text-secondary-foreground transition-colors">Shipping Policy</Link>
            <Link href="/refund-policy" className="hover:text-secondary-foreground transition-colors">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
