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
            if (Array.isArray(parsedImages) && parsedImages.length > 0 && parsedImages[0]) {
                imageUrl = parsedImages[0];
            }
        } catch (e) {
            // Assuming images is just a single URL string that isn't empty
            if (typeof rawProduct.images === 'string' && rawProduct.images.trim() !== '') {
               imageUrl = rawProduct.images;
            }
        }
    }
    
    const slug = rawProduct.slug || (rawProduct.title ? rawProduct.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/(^-|-$)/g, '') : String(rawProduct.id));

    return {
        ...rawProduct,
        id: String(rawProduct.id),
        slug: slug,
        imageUrl: imageUrl || `https://picsum.photos/seed/${slug}/800/600`,
    };
}
