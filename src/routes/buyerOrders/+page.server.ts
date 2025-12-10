import { redirect } from '@sveltejs/kit';
import { getOrdersByBuyerId } from '$lib/server/db/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  if (locals.user.role !== 'buyer') {
    throw redirect(302, '/');
  }

  const allOrders = await getOrdersByBuyerId(locals.user.id);

  const statusFilter = url.searchParams.get('status') || 'active';

  let filteredOrders = allOrders;

  if (statusFilter === 'active') {
    filteredOrders = allOrders.filter((order) =>
      ['pending', 'processing', 'shipped'].includes(order.orderStatus)
    );
  } else if (statusFilter === 'completed') {
    filteredOrders = allOrders.filter((order) => order.orderStatus === 'delivered');
  } else if (statusFilter === 'cancelled') {
    filteredOrders = allOrders.filter((order) => order.orderStatus === 'cancelled');
  }

  return {
    orders: filteredOrders,
    allOrders,
    user: locals.user,
    currentFilter: statusFilter
  };
};