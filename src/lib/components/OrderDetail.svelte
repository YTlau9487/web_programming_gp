<script>
	import Van from '~icons/lucide/van';
	import Package from '~icons/lucide/package';
	import Clock from '~icons/lucide/clock';
	import CircleCheck from '~icons/lucide/circle-check';
	import CircleX from '~icons/lucide/circle-x';

	let props = $props();
	let { orderId, createdAt, status, products, totalAmount } = props;

	// @ts-ignore
	function getStatusColor(status) {
		const lowerStatus = status.toLowerCase();
		switch (lowerStatus) {
			case 'pending':
				return 'bg-yellow-200 text-yellow-900';
			case 'processing':
				return 'bg-blue-200 text-blue-900';
			case 'shipped':
				return 'bg-purple-200 text-purple-900';
        case 'cancelled':
        return 'bg-red-200 text-red-900';
			case 'delivered':
				return 'bg-green-200 text-green-900';
			default:
				return 'bg-gray-500 text-gray-900';
		}
	}
</script>

<div class="p-4 my-5 border border-gray-300 rounded-lg bg-white shadow-md">
	<h2 class="text-xl font-bold mb-2 text-gray-800">Order ID: {orderId}</h2>

	<div class="flex justify-between items-center mb-4">
		<span class="text-sm text-gray-600">Created: {createdAt}</span>
		<span class="px-3 py-1 rounded-md font-medium {getStatusColor(status)}">
			{#if status === 'pending'}
				<Clock class="inline w-4 h-4 mr-1" />
			{:else if status === 'shipped'}
				<Van class="inline w-4 h-4 mr-1" />
      {:else if status === 'processing'}
        <Package class="inline w-4 h-4 mr-1" />
      {:else if status === 'cancelled'} 
        <CircleX class="inline w-4 h-4 mr-1" />
			{:else if status === 'delivered'}
				<CircleCheck class="inline w-4 h-4 mr-1" />
			{:else}
				<Package class="inline w-4 h-4 mr-1" />
			{/if}
			{status}
		</span>
	</div>

	<div class="mb-4">
		{#each products as product}
			<div class="flex items-center mb-3 border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
				<img src={product.img} alt={product.name} class="w-16 h-16 object-cover rounded-md mr-4" />
				<div class="grow">
					<p class="text-base font-medium text-gray-800">{product.name}</p>
					<p class="text-sm text-gray-600">Qty: {product.qty}</p>
				</div>
			</div>
		{/each}
	</div>

	<p class="text-lg font-bold text-gray-800 border-t border-gray-200 pt-2">
		Total: ${totalAmount.toFixed(2)}
	</p>
</div>
