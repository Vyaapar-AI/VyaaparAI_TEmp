
import BakeryProductsPage from '@/themes/bakery/ProductsPage';
import GroceryProductsPage from '@/themes/grocery/ProductsPage';
import SweetsProductsPage from '@/themes/sweets/ProductsPage';
import ProvisionProductsPage from '@/themes/provision/ProductsPage';
import FoodCourtProductsPage from '@/themes/food-court/ProductsPage';
import HomeDecorProductsPage from '@/themes/home-decor/ProductsPage';
import ClothingProductsPage from '@/themes/clothing/ProductsPage';
import CosmeticProductsPage from '@/themes/cosmetic/ProductsPage';

const businessType = process.env.NEXT_PUBLIC_BUSINESS_TYPE || 'bakery';

export default function ProductsPage() {
  if (businessType === 'grocery') {
    return <GroceryProductsPage />;
  }

  if (businessType === 'sweets') {
    return <SweetsProductsPage />;
  }

  if (businessType === 'provision') {
    return <ProvisionProductsPage />;
  }

  if (businessType === 'food-court') {
    return <FoodCourtProductsPage />;
  }

  if (businessType === 'home-decor') {
    return <HomeDecorProductsPage />;
  }
  
  if (businessType === 'clothing') {
    return <ClothingProductsPage />;
  }
  
  if (businessType === 'cosmetic') {
    return <CosmeticProductsPage />;
  }
  
  // Default to bakery
  return <BakeryProductsPage />;
}
