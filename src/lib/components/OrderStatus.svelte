<script >



  // Sample data - replace with your actual data
  const orders = [
    {
      id: 'ORD-2025-0481',
      date: '2025-12-05',
      products: [
        { name: 'Wireless Earbuds Pro', quantity: 1 },
        { name: 'Phone Case - Black', quantity: 2 }
      ],
      total: 189.97,
      status: 'processing',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 'ORD-2025-0479',
      date: '2025-12-04',
      products: [
        { name: 'Laptop Stand Aluminum', quantity: 1 }
      ],
      total: 49.99,
      status: 'shipped',
      shippingAddress: '456 Oak Avenue, Los Angeles, CA 90210'
    },
    {
      id: 'ORD-2025-0475',
      date: '2025-12-02',
      products: [
        { name: 'Mechanical Keyboard RGB', quantity: 1 },
        { name: 'Mouse Pad XXL', quantity: 1 }
      ],
      total: 179.98,
      status: 'delivered',
      shippingAddress: '789 Pine Road, Chicago, IL 60601'
    },
    {
      id: 'ORD-2025-0468',
      date: '2025-11-30',
      products: [
        { name: 'Smart Watch Series X', quantity: 1 }
      ],
      total: 399.00,
      status: 'cancelled',
      shippingAddress: '321 Elm Street, Houston, TX 77002'
    }
  ];

  // Helper to get status badge classes
  // @ts-ignore
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
      default:
        return `${base} bg-gray-600`;
    }
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
  {#each orders as order}
    <div class="grid grid-cols-12 gap-4 border-b border-gray-100 px-6 py-5 text-sm hover:bg-gray-50 transition-colors">
      <!-- Order ID -->
      <div class="col-span-2 font-medium text-gray-900">
        {order.id}
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
              <span class="font-medium">×{product.quantity}</span>
              <span class="truncate max-w-64">{product.name}</span>
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
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <!-- Shipping Address -->
      <div class="col-span-2 text-gray-600 text-xs">
        {order.shippingAddress}
      </div>
    </div>
  {/each}
</div>