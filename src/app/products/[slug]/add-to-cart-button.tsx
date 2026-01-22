'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="flex items-center gap-4">
       <Input 
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
        className="w-20"
        aria-label="Quantity"
      />
      <Button onClick={handleAddToCart} size="lg" className="flex-1">
        <ShoppingBag className="mr-2 h-5 w-5" />
        Add to cart
      </Button>
    </div>
  );
}
