import { db } from './index';
import { product, productImage, productDimensions, productReview } from './schema';
import productsData from '$lib/data/products.json';

export async function seedProducts() {
  try {
    // Check if products already exist
    const existingProducts = await db.select().from(product).limit(1);
    if (existingProducts.length > 0) {
      console.log('Products already seeded, skipping...');
      return;
    }

    console.log('Starting product seed...');

    for (const p of productsData.products) {
      // Insert product
      await db.insert(product).values({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        price: p.price,
        discountPercentage: p.discountPercentage,
        rating: p.rating,
        stock: p.stock,
        brand: p.brand ?? "unknown",
        sku: p.sku,
        weight: p.weight,
        warrantyInformation: p.warrantyInformation,
        shippingInformation: p.shippingInformation,
        availabilityStatus: p.availabilityStatus,
        returnPolicy: p.returnPolicy,
        minimumOrderQuantity: p.minimumOrderQuantity,
        barcode: p.meta.barcode,
        qrCode: p.meta.qrCode,
        createdAt: new Date(p.meta.createdAt),
        updatedAt: new Date(p.meta.updatedAt),
        thumbnail: p.thumbnail,
      });

      // Insert product images
      for (const imageUrl of p.images) {
        await db.insert(productImage).values({
          productId: p.id,
          imageUrl,
        });
      }

      // Insert product dimensions
      await db.insert(productDimensions).values({
        productId: p.id,
        width: p.dimensions.width,
        height: p.dimensions.height,
        depth: p.dimensions.depth,
      });

      // Insert product reviews
      for (const review of p.reviews) {
        await db.insert(productReview).values({
          productId: p.id,
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.date),
          reviewerName: review.reviewerName,
          reviewerEmail: review.reviewerEmail,
        });
      }
    }

    console.log('Product seed completed successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
