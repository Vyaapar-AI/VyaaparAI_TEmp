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
      <div className="container relative flex h-16 max-w-screen-2xl items-center">
        {/* Left side: Mobile Menu Trigger and Desktop Logo */}
        <div className="flex flex-1 items-center justify-start">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-4">
                 <Logo />
                 <nav className="mt-8 flex flex-col gap-4">
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
           <Link href="/" className="hidden md:flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        {/* Center: Desktop Navigation & Mobile Logo */}
        <div className="flex md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <nav className="hidden md:flex items-center justify-center gap-8 text-sm">
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
            <div className="flex md:hidden">
                <Link href="/" className="flex items-center space-x-2">
                    <Logo />
                </Link>
            </div>
        </div>

        {/* Right side: Icons */}
        <div className="flex flex-1 items-center justify-end space-x-1">
          <Button variant="ghost" size="icon">
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
