import { db } from './index';
import { product, productImage, productDimensions, productReview, buyerOrder, orderItem } from './schema';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

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

export async function getOrdersByBuyerId(buyerId: number) {
  try {
    const orders = await db.select().from(buyerOrder).where(eq(buyerOrder.buyerId, buyerId));
    
    console.log(`Fetched ${orders.length} orders for buyer ${buyerId}`);
    
    if (orders.length === 0) return [];

    // For each order, get its items and product details
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await db.select().from(orderItem).where(eq(orderItem.orderId, order.id));
        
        const productsInOrder = await Promise.all(
          items.map(async (item) => {
            const [prod] = await db.select().from(product).where(eq(product.id, item.productId));
            const images = await db.select().from(productImage).where(eq(productImage.productId, item.productId));
            return {
              ...prod,
              quantity: item.quantity,
              itemPrice: item.price,
              images: images.map(img => img.imageUrl),
            };
          })
        );

        return {
          ...order,
          products: productsInOrder,
        };
      })
    );

    console.log(`Processed ${ordersWithItems.length} orders with items`);
    return ordersWithItems;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
