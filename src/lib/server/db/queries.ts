import { db } from './index';
import { product, productImage, productDimensions, productReview } from './schema';
import { eq } from 'drizzle-orm';

export async function getAllProducts() {
  return await db.select().from(product);
}

export async function getProductById(id: number) {
  const [p] = await db.select().from(product).where(eq(product.id, id));
  
  if (!p) return null;

  const images = await db.select().from(productImage).where(eq(productImage.productId, id));
  const [dimensions] = await db.select().from(productDimensions).where(eq(productDimensions.productId, id));
  const reviews = await db.select().from(productReview).where(eq(productReview.productId, id));

  return {
    ...p,
    images: images.map(img => img.imageUrl),
    dimensions: dimensions ? { width: dimensions.width, height: dimensions.height, depth: dimensions.depth } : null,
    reviews
  };
}
