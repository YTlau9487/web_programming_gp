import { redirect } from '@sveltejs/kit';
import { getOrdersByBuyerId } from '$lib/server/db/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
  // Check if user is logged in
  if (!locals.user) {
    console.log('No user found, redirecting to login');
    redirect(302, '/login');
  }

  console.log('User loaded:', locals.user);

  // Check if user is a buyer
  if (locals.user.role !== 'buyer') {
    console.log('User is not a buyer, redirecting');
    redirect(302, '/');
  }

  // Fetch orders for the logged-in buyer
  const allOrders = await getOrdersByBuyerId(locals.user.id);
  
  console.log('All orders fetched:', allOrders.length, 'for user ID:', locals.user.id);

  // Get status filter from URL params
  const statusFilter = url.searchParams.get('status') || 'active';
  console.log('Current filter:', statusFilter);

  // Filter orders by status
  let filteredOrders = allOrders;
  
  if (statusFilter === 'active') {
    filteredOrders = allOrders.filter(order => 
      ['pending', 'processing', 'shipped'].includes(order.orderStatus)
    );
    console.log('Active orders count:', filteredOrders.length);
  } else if (statusFilter === 'completed') {
    filteredOrders = allOrders.filter(order => order.orderStatus === 'delivered');
    console.log('Completed orders count:', filteredOrders.length);
  } else if (statusFilter === 'cancelled') {
    filteredOrders = allOrders.filter(order => order.orderStatus === 'cancelled');
    console.log('Cancelled orders count:', filteredOrders.length);
  }

  return {
    orders: filteredOrders,
    allOrders,
    user: locals.user,
    currentFilter: statusFilter,
  };
};
