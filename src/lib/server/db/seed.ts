import { db } from './index';
import { product, productImage, productDimensions, productReview, user, buyerOrder, orderItem } from './schema';
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

    // Get all sellers
    const sellers = await db.select().from(user).where(eq(user.role, 'seller'));
    if (sellers.length === 0) {
      console.log('No sellers found, please seed users first');
      return;
    }

    for (const p of productsData.products) {
      // Randomly assign product to a seller
      const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];

      // Insert product
      await db.insert(product).values({
        id: p.id,
        sellerId: randomSeller.id,
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

export async function seedOrders() {
  try {
    const existingOrders = await db.select().from(buyerOrder).limit(1);
    if (existingOrders.length > 0) {
      console.log('Orders already seeded, skipping...');
      return;
    }

    console.log('Starting order seed...');

    // Get all buyers
    const buyers = await db.select().from(user).where(eq(user.role, 'buyer'));
    const products = await db.select().from(product);

    if (buyers.length === 0 || products.length === 0) {
      console.log('No buyers or products found');
      return;
    }

    const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    // Create orders for each buyer covering all statuses with more data
    for (const buyer of buyers) {
      // Create 3 orders per status per buyer (15 orders per buyer total)
      for (const status of orderStatuses) {
        for (let i = 0; i < 3; i++) {
          const orderId = await db.insert(buyerOrder).values({
            buyerId: buyer.id,
            fullName: buyer.username,
            address: `${Math.floor(Math.random() * 1000)} Main St`,
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            phone: '555-' + Math.floor(Math.random() * 9000) + 1000,
            cardNumber: '4532-' + Math.floor(Math.random() * 9000 + 1000) + '-' + Math.floor(Math.random() * 9000 + 1000) + '-' + Math.floor(Math.random() * 9000 + 1000),
            orderStatus: status,
          }).returning({ id: buyerOrder.id });

          // Add 1-5 items per order
          const itemCount = Math.floor(Math.random() * 5) + 1;
          for (let j = 0; j < itemCount; j++) {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            const quantity = Math.floor(Math.random() * 5) + 1;

            await db.insert(orderItem).values({
              orderId: orderId[0].id,
              productId: randomProduct.id,
              quantity,
              price: randomProduct.price,
            });
          }
        }
      }
    }

    console.log('Order seed completed successfully!');
  } catch (error) {
    console.error('Error seeding orders:', error);
  }
}
