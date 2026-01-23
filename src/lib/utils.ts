import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformProduct(rawProduct: any): Product {
    let imageUrl = '';
    if (rawProduct.images) {
        try {
            // Assuming images is a JSON string array of URLs
            const parsedImages = JSON.parse(rawProduct.images);
            if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                imageUrl = parsedImages[0];
            }
        } catch (e) {
            // Assuming images is just a single URL string
            imageUrl = rawProduct.images;
        }
    }

    return {
        ...rawProduct,
        id: String(rawProduct.id),
        slug: rawProduct.slug || (rawProduct.title ? rawProduct.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/(^-|-$)/g, '') : String(rawProduct.id)),
        imageUrl: imageUrl,
    };
}
