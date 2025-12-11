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


export async function createOrder(orderData: {
  buyerId: number;
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  cardNumber: string;
  items: Array<{
    productId: number;
    quantity: number;
    price: number;
  }>;
}) {
  try {
    // Create the buyer order
    const result = await db.insert(buyerOrder).values({
      buyerId: orderData.buyerId,
      fullName: orderData.fullName,
      address: orderData.address,
      city: orderData.city,
      state: orderData.state,
      zipCode: orderData.zipCode,
      phone: orderData.phone,
      cardNumber: orderData.cardNumber,
      orderStatus: 'pending',
    }).returning({ id: buyerOrder.id });

    const orderId = result[0].id;

    // Create order items and decrement product stock
    for (const item of orderData.items) {
      // Check current stock before decrementing
      const [currentProduct] = await db.select({ stock: product.stock }).from(product).where(eq(product.id, item.productId));

      if (!currentProduct || currentProduct.stock <= 0) {
        console.warn(`[createOrder] Product ${item.productId} is out of stock, cannot proceed`);
        throw new Error(`Product ${item.productId} is out of stock`);
      }

      if (currentProduct.stock < item.quantity) {
        console.warn(`[createOrder] Product ${item.productId} insufficient stock: ${currentProduct.stock} < ${item.quantity}`);
        throw new Error(`Product ${item.productId} has insufficient stock. Available: ${currentProduct.stock}, Requested: ${item.quantity}`);
      }

      await db.insert(orderItem).values({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });

      // Decrement product stock (but never below 0)
      await db.update(product)
        .set({ stock: sql`MAX(0, ${product.stock} - ${item.quantity})` })
        .where(eq(product.id, item.productId));

      console.log(`[createOrder] Decremented stock for product ${item.productId} by ${item.quantity}`);
    }

    console.log(`Order ${orderId} created successfully with ${orderData.items.length} items`);
    return { orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
