import BakeryHomePage from '@/themes/bakery/HomePage';
import GroceryHomePage from '@/themes/grocery/HomePage';
import SweetsHomePage from '@/themes/sweets/HomePage';
import ProvisionHomePage from '@/themes/provision/HomePage';
import FoodCourtHomePage from '@/themes/food-court/HomePage';
import HomeDecorHomePage from '@/themes/home-decor/HomePage';
import ClothingHomePage from '@/themes/clothing/HomePage';
import CosmeticHomePage from '@/themes/cosmetic/HomePage';

const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

export default function Home() {
  if (businessType === 'grocery') {
    return <GroceryHomePage />;
  }

  if (businessType === 'sweets') {
    return <SweetsHomePage />;
  }

  if (businessType === 'provision') {
    return <ProvisionHomePage />;
  }

  if (businessType === 'food-court') {
    return <FoodCourtHomePage />;
  }

  if (businessType === 'home-decor') {
    return <HomeDecorHomePage />;
  }
  
  if (businessType === 'clothing') {
    return <ClothingHomePage />;
  }
  
  if (businessType === 'cosmetic') {
    return <CosmeticHomePage />;
  }
  
  // Default to bakery
  return <BakeryHomePage />;
}
