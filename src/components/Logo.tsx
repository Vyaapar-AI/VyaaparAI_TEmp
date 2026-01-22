import { Cookie } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Cookie className="h-6 w-6 text-primary" />
      <span className="font-bold font-headline text-lg">Sweet Delights Bakery</span>
    </div>
  );
}
