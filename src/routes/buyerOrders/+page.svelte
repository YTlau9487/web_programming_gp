<script lang="ts">
	import OrderDetail from '$lib/components/OrderDetail.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import ArrowLeft from '~icons/lucide/arrow-left';
	import { goto, invalidateAll } from '$app/navigation';

	export let data;

	let orders = data.orders || [];
	let hasOrders = data.allOrders.length > 0;
	let currentFilter = data.currentFilter || 'active';

	const tabItems = ['Active Orders', 'Completed', 'Cancelled'];
	const filterMap: Record<string, string> = {
		'Active Orders': 'active',
		'Completed': 'completed',
		'Cancelled': 'cancelled'
	};

	const reverseFilterMap: Record<string, string> = {
		'active': 'Active Orders',
		'completed': 'Completed',
		'cancelled': 'Cancelled'
	};

	// Reactively update selectedTab when currentFilter changes
	$: selectedTab = reverseFilterMap[currentFilter] || 'Active Orders';
	$: orders = data.orders || [];
	$: hasOrders = data.allOrders.length > 0;
	$: currentFilter = data.currentFilter || 'active';

	async function handleTabChange(event: CustomEvent<{ value: string }>) {
		const tabName = event.detail.value;
		const status = filterMap[tabName];
		console.log('Tab changed to:', tabName, '-> status:', status);
		
		// Update URL and wait for navigation
		await goto(`/buyerOrders?status=${status}`, { replaceState: false });
		
		// Invalidate to refetch data
		await invalidateAll();
	}
</script>

<div class="p-2 mb-4 shadow-[0px_5px_3px_0px_rgba(0,0,0,0.1)]">
	<button 
		on:click={() => goto('/')}
		class="rounded-md ml-4 p-2 text-center hover:bg-gray-50 cursor-pointer"
	>
		<ArrowLeft class="inline-block w-5 h-5 mr-2" />
		Back to Shopping
	</button>
</div>

<div class="ml-4 mr-4">
	<p class="p-4 mb-4 text-xl">My Orders</p>

	{#if !hasOrders}
		<div class="p-8 text-center bg-gray-50 rounded-lg">
			<p class="text-lg text-gray-600 mb-4">You haven't placed any orders yet.</p>
			<button 
				on:click={() => goto('/')}
				class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
			>
				Start Shopping
			</button>
		</div>
	{:else}
		<div class="mb-4">
			<Tabs items={tabItems} bind:value={selectedTab} on:change={handleTabChange} />
		</div>

		<div>
			{#if orders.length === 0}
				<div class="p-8 text-center bg-gray-50 rounded-lg">
					<p class="text-gray-600">No orders in this category.</p>
				</div>
			{:else}
				<div>
					{#each orders as order (order.id)}
						<OrderDetail
							orderId={order.id}
							createdAt={new Date(order.createdAt).toLocaleString()}
							status={order.orderStatus}
							products={order.products.map(p => ({
								img: p.images[0] || p.thumbnail,
								name: p.title,
								qty: p.quantity,
								price: p.itemPrice
							}))}
							totalAmount={order.products.reduce((sum, p) => sum + (p.itemPrice * p.quantity), 0)}
						/>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>