import Link from 'next/link';
import { CartIcon } from './CartIcon';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { UserNav } from './UserNav';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Products' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        {/* Left Slot */}
        <div className="flex-1 flex items-center justify-start">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="p-4">
                  <Link href="/" className="mb-8 block">
                    <Logo />
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map(link => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-lg font-medium transition-colors hover:text-foreground text-foreground/80"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="hidden md:flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        {/* Center Slot */}
        <div className="flex items-center justify-center">
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map(link => (
                <Link
                key={link.label}
                href={link.href}
                className="font-medium transition-colors hover:text-foreground text-foreground/80"
                >
                {link.label}
                </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>

        {/* Right Slot */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <CartIcon />
          <UserNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
