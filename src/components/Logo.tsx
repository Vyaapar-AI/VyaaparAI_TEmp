import { Cookie, ShoppingBasket, Candy, Store, Pizza, Sofa, Shirt } from 'lucide-react';

export function Logo() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'My Store';
  const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

  let IconComponent;

  switch (businessType) {
    case 'grocery':
      IconComponent = ShoppingBasket;
      break;
    case 'sweets':
      IconComponent = Candy;
      break;
    case 'provision':
      IconComponent = Store;
      break;
    case 'food-court':
      IconComponent = Pizza;
      break;
    case 'home-decor':
      IconComponent = Sofa;
      break;
    case 'clothing':
      IconComponent = Shirt;
      break;
    case 'bakery':
    default:
      IconComponent = Cookie;
      break;
  }

  return (
    <div className="flex items-center space-x-2">
      <IconComponent className="h-8 w-8 text-primary" />
      <span className="font-bold font-headline text-2xl">{storeName}</span>
    </div>
  );
}
