import BakeryHomePage from '@/themes/bakery/HomePage';
import GroceryHomePage from '@/themes/grocery/HomePage';

const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

export default function Home() {
  if (businessType === 'grocery') {
    return <GroceryHomePage />;
  }
  
  // Default to bakery
  return <BakeryHomePage />;
}
