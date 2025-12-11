<script lang="ts">
  import type { BuyerOrder } from '$lib/server/db/schema';

  type OrderProduct = {
    name: string;
    quantity: number;
    price: number;
  };

  type OrderView = {
    id: BuyerOrder['id'];
    date: Date | string;
    products: OrderProduct[];
    total: number;
    status: BuyerOrder['orderStatus'];
    shippingAddress: string;
  };

  export let orders: OrderView[] = [];

  // Helper to get status badge classes - with fixed sizing
  function getStatusClasses(status: string): string {
    const base =
      'w-24 h-8 rounded-xl border text-xs font-medium flex items-center justify-center';
    switch (status) {
      case 'processing':
        return `${base} bg-blue-50 border-blue-200 text-blue-600`;
      case 'shipped':
        return `${base} bg-purple-50 border-purple-200 text-purple-600`;
      case 'delivered':
        return `${base} bg-green-50 border-green-200 text-green-600`;
      case 'cancelled':
        return `${base} bg-red-50 border-red-200 text-red-600`;
      case 'pending':
        return `${base} bg-yellow-50 border-yellow-200 text-yellow-600`;
      default:
        return `${base} bg-gray-50 border-gray-200 text-gray-600`;
    }
  }

  function formatStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
</script>

<div
  class="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm"
>
  <!-- Table Header -->
  <div
    class="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-700"
  >
    <div class="col-span-2">Order ID</div>
    <div class="col-span-2">Date</div>
    <div class="col-span-3">Products</div>
    <div class="col-span-1 text-right">Total</div>
    <div class="col-span-2 text-center">Status</div>
    <div class="col-span-2">Shipping Address</div>
  </div>

  <!-- Orders Rows -->
  {#if orders.length === 0}
    <div class="px-6 py-8 text-center text-gray-500">
      <p>No orders found.</p>
    </div>
  {:else}
    {#each orders as order (order.id)}
      <div
        class="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-gray-100
               px-4 md:px-6 py-4 text-sm hover:bg-gray-50 transition-colors
               md:items-center"
      >
        <!-- Order ID -->
        <div class="md:col-span-2 font-medium text-gray-900">
          {order.id.substring(0, 8)}...
        </div>

        <!-- Date -->
        <div class="md:col-span-2 text-gray-600 text-xs md:text-sm">
          {new Date(order.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>

        <!-- Products -->
        <div class="md:col-span-3">
          <div class="space-y-1">
            {#each order.products as product}
              <div class="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                <span class="truncate max-w-64"
                  >{product.name}
                  <span class="font-medium">x{product.quantity}</span></span
                >
              </div>
            {/each}
          </div>
        </div>

        <!-- Total -->
        <div
          class="md:col-span-1 text-left md:text-right font-semibold text-gray-900 text-sm md:text-base"
        >
          ${order.total.toFixed(2)}
        </div>

        <!-- Status Badge -->
        <div class="md:col-span-2 flex md:justify-center items-center">
          <span class={getStatusClasses(order.status)}>
            {formatStatus(order.status)}
          </span>
        </div>

        <!-- Shipping Address -->
        <div class="md:col-span-2 text-gray-600 text-xs md:text-sm md:text-right">
          {order.shippingAddress}
        </div>
      </div>
    {/each}
  {/if}
</div>