<script>
  // @ts-ignore
  let props = $props();
  let { orderId, createdAt, status, products, totalAmount } = props;

  // @ts-ignore
  function getStatusColor(status) {
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case 'pending':
        return 'bg-yellow-500 text-yellow-900';
      case 'processing':
        return 'bg-orange-500 text-orange-900';
      case 'shipped':
        return 'bg-blue-500 text-blue-900';
      case 'delivered':
        return 'bg-green-500 text-green-900';
      default:
        return 'bg-gray-500 text-gray-900';
    }
  }
</script>

<div class="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
  <h2 class="text-xl font-bold mb-2 text-gray-800">Order ID: {orderId}</h2>
  
  <div class="flex justify-between items-center mb-4">
    <span class="text-sm text-gray-600">Created: {createdAt}</span>
    <span class="px-3 py-1 rounded-md font-medium {getStatusColor(status)}">
      {status}
    </span>
  </div>
  
  <div class="mb-4">
    {#each products as product}
      <div class="flex items-center mb-3 border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
        <img src={product.img} alt={product.name} class="w-16 h-16 object-cover rounded-md mr-4" />
        <div class="flex-grow">
          <p class="text-base font-medium text-gray-800">{product.name}</p>
          <p class="text-sm text-gray-600">Qty: {product.qty}</p>
        </div>
      </div>
    {/each}
  </div>
  
  <p class="text-lg font-bold text-gray-800 border-t border-gray-200 pt-2">Total: ${totalAmount.toFixed(2)}</p>
</div>