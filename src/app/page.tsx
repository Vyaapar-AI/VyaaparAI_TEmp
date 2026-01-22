import BakeryHomePage from '@/themes/bakery/HomePage';
import GroceryHomePage from '@/themes/grocery/HomePage';
import SweetsHomePage from '@/themes/sweets/HomePage';

const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

export default function Home() {
  if (businessType === 'grocery') {
    return <GroceryHomePage />;
  }

  if (businessType === 'sweets') {
    return <SweetsHomePage />;
  }
  
  // Default to bakery
  return <BakeryHomePage />;
}
