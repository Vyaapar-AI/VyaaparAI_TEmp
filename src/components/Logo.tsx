import { Cookie } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Cookie className="h-8 w-8 text-primary" />
      <span className="font-bold font-headline text-2xl">Bakery</span>
    </div>
  );
}
