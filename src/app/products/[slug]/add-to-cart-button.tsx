'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";
import { ShoppingBag, XCircle, Plus, Minus } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const cartItem = cartItems.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: "Added to cart!",
      description: `1 x ${product.title} added to your cart.`,
    });
  };

  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(cartItem.id, cartItem.quantity - 1);
      } else {
        removeFromCart(cartItem.id);
        toast({
            title: "Item removed",
            description: `${product.title} has been removed from your cart.`,
        });
      }
    }
  };

  if (product.stock === 0) {
    return (
      <Button size="lg" disabled className="w-full">
        <XCircle className="mr-2 h-5 w-5" />
        Out of stock
      </Button>
    );
  }
  
  return (
    <div className="flex items-center gap-4 w-full">
      {cartItem ? (
        <>
          <p className="font-medium">Quantity</p>
          <div className="flex items-center justify-center gap-2 border rounded-lg p-1">
              <Button variant="ghost" size="icon" onClick={handleDecrease} aria-label="Decrease quantity" className="h-9 w-9">
                  <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-bold w-12 text-center" aria-live="polite">{cartItem.quantity}</span>
              <Button variant="ghost" size="icon" onClick={handleIncrease} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock} className="h-9 w-9">
                  <Plus className="h-4 w-4" />
              </Button>
          </div>
        </>
      ) : (
        <Button onClick={handleAddToCart} size="lg" className="flex-1">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to cart
        </Button>
      )}
    </div>
  );
}
