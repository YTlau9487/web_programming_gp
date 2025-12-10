import { db } from './index';
import { product, productImage, productDimensions, productReview, user, sellerProduct } from './schema';
import productsData from '$lib/data/products.json';
import { hash } from 'argon2';
import { eq } from 'drizzle-orm';

export async function seedUsers() {
  try {
    const existingUsers = await db.select().from(user).limit(1);
    if (existingUsers.length > 0) {
      console.log('Users already seeded, skipping...');
      return;
    }

    console.log('Starting user seed...');

    const dummyUsers = [
      { email: 'buyer1@example.com', username: 'john_buyer', password: 'password123', role: 'buyer' },
      { email: 'buyer2@example.com', username: 'jane_buyer', password: 'password123', role: 'buyer' },
      { email: 'seller1@example.com', username: 'alice_seller', password: 'password123', role: 'seller' },
      { email: 'seller2@example.com', username: 'bob_seller', password: 'password123', role: 'seller' },
      { email: 'admin@example.com', username: 'admin_user', password: 'password123', role: 'buyer' },
    ];

    for (const u of dummyUsers) {
      const passwordHash = await hash(u.password);
      await db.insert(user).values({
        email: u.email,
        username: u.username,
        passwordHash,
        role: u.role,
      });
    }

    console.log('User seed completed successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export async function seedProducts() {
  try {
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

export async function seedSellerProducts() {
  try {
    const existingSellerProducts = await db.select().from(sellerProduct).limit(1);
    if (existingSellerProducts.length > 0) {
      console.log('Seller products already seeded, skipping...');
      return;
    }

    console.log('Starting seller product assignment...');

    // Get all sellers and products
    const sellers = await db.select().from(user).where(eq(user.role, 'seller'));
    const products = await db.select().from(product);

    if (sellers.length === 0 || products.length === 0) {
      console.log('No sellers or products found');
      return;
    }

    // Assign products to sellers (distribute products across sellers)
    for (let i = 0; i < products.length; i++) {
      const sellerIndex = i % sellers.length;
      await db.insert(sellerProduct).values({
        sellerId: sellers[sellerIndex].id,
        productId: products[i].id,
        createdAt: new Date(),
      });
    }

    console.log('Seller product assignment completed successfully!');
  } catch (error) {
    console.error('Error seeding seller products:', error);
  }
}
