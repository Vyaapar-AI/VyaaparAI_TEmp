import { Cookie } from 'lucide-react';

export function Logo() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'My Store';
  return (
    <div className="flex items-center space-x-2">
      <Cookie className="h-8 w-8 text-primary" />
      <span className="font-bold font-headline text-2xl">{storeName}</span>
    </div>
  );
}
