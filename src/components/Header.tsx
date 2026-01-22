import Link from 'next/link';
import { CartIcon } from './CartIcon';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Ciabatta' },
  { href: '/#products', label: 'Breadstick' },
  { href: '/#products', label: 'Cookies' },
  { href: '/#products', label: 'Contact Us' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="flex items-center flex-1 md:flex-none">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-4">
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
                      key={link.href}
                      href={link.href}
                      className="transition-colors hover:text-foreground/80 text-foreground/80"
                    >
                      {link.label}
                    </Link>
                  ))}
                 </nav>
              </div>
            </SheetContent>
          </Sheet>
           <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm">
          {navLinks.map(link => (
             <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/80 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
