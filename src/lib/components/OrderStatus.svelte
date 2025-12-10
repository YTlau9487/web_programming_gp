<script>
  export let orders = [];

  // Helper to get status badge classes
  function getStatusClasses(status) {
    const base = 'px-3 py-1 rounded-full text-xs font-medium text-white';
    switch (status) {
      case 'processing':
        return `${base} bg-blue-600`;
      case 'shipped':
        return `${base} bg-purple-600`;
      case 'delivered':
        return `${base} bg-green-600`;
      case 'cancelled':
        return `${base} bg-red-600`;
      case 'pending':
        return `${base} bg-yellow-600`;
      default:
        return `${base} bg-gray-600`;
    }
  }

  function formatStatus(status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
</script>

<div class="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
  <!-- Table Header -->
  <div class="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-700">
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
      <div class="grid grid-cols-12 gap-4 border-b border-gray-100 px-6 py-5 text-sm hover:bg-gray-50 transition-colors">
        <!-- Order ID -->
        <div class="col-span-2 font-medium text-gray-900">
          {order.id.substring(0, 8)}...
        </div>

        <!-- Date -->
        <div class="col-span-2 text-gray-600">
          {new Date(order.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>

        <!-- Products -->
        <div class="col-span-3">
          <div class="space-y-1">
            {#each order.products as product}
              <div class="flex items-center gap-2 text-gray-700">
                <span class="truncate max-w-64">{product.name} <span class="font-medium">x{product.quantity}</span></span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Total -->
        <div class="col-span-1 text-right font-semibold text-gray-900">
          ${order.total.toFixed(2)}
        </div>

        <!-- Status Badge -->
        <div class="col-span-2 flex justify-center">
          <span class={getStatusClasses(order.status)}>
            {formatStatus(order.status)}
          </span>
        </div>

        <!-- Shipping Address -->
        <div class="col-span-2 text-gray-600 text-xs">
          {order.shippingAddress}
        </div>
      </div>
    {/each}
  {/if}
</div>