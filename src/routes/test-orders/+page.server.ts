import { getOrdersByBuyerId } from '$lib/server/db/queries';
import { db } from '$lib/server/db';
import { user, buyerOrder } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Get all users
  const allUsers = await db.select().from(user);
  console.log('All users:', allUsers);

  // Get all orders
  const allOrders = await db.select().from(buyerOrder);
  console.log('All buyer orders count:', allOrders.length);
  console.log('Sample orders:', allOrders.slice(0, 3));

  // Try getting orders for user 1
  const ordersForUser1 = await getOrdersByBuyerId(1);
  console.log('Orders for user 1:', ordersForUser1.length);

  return {
    allUsers,
    allOrders: allOrders.slice(0, 5),
    ordersForUser1: ordersForUser1.slice(0, 3),
  };
};
