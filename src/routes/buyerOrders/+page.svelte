<script lang="ts">
	import OrderDetail from '$lib/components/OrderDetail.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import ArrowLeft from '~icons/lucide/arrow-left';
	import { goto } from '$app/navigation';

	type OrderProduct = {
		images: string[];
		thumbnail: string;
		title: string;
		quantity: number;
		itemPrice: number;
	};

	type Order = {
		id: string;
		createdAt: number | string;
		orderStatus: string;
		products: OrderProduct[];
	};

	const { data } = $props<{
		data: {
			orders: Order[];
			allOrders: Order[];
			currentFilter: string;
		};
	}>();

	const orders = $derived(data.orders ?? []);
	const hasOrders = $derived((data.allOrders ?? []).length > 0);
	const currentFilter = $derived(data.currentFilter ?? 'active');

	const tabItems = ['Active Orders', 'Completed', 'Cancelled'];

	const filterMap: Record<string, string> = {
		'Active Orders': 'active',
		Completed: 'completed',
		Cancelled: 'cancelled'
	};

	const reverseFilterMap: Record<string, string> = {
		active: 'Active Orders',
		completed: 'Completed',
		cancelled: 'Cancelled'
	};

	// bindable state
	let selectedTab = $state('Active Orders');

	// keep selectedTab in sync with currentFilter (run in an effect so we don't
	// capture the initial value only)
	$effect(() => {
		selectedTab = reverseFilterMap[currentFilter] || 'Active Orders';
	});

	function handleTabChange(payload: { value: string; item: any }) {
		const tabName = payload.value;
		const status = filterMap[tabName];
		if (!status) return;
		goto(`/buyerOrders?status=${status}`);
	}
</script>

<div class="p-2 mb-4 shadow-[0px_5px_3px_0px_rgba(0,0,0,0.1)]">
	<button
		onclick={() => goto('/')}
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
				onclick={() => goto('/')}
				class="px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 active:bg-black/70 cursor-pointer"
			>
				Start Shopping
			</button>
		</div>
	{:else}
		<div class="mb-4">
			<Tabs items={tabItems} bind:value={selectedTab} onChange={handleTabChange} />
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
							products={order.products.map((p: OrderProduct) => ({
								img: p.images[0] || p.thumbnail,
								name: p.title,
								qty: p.quantity,
								price: p.itemPrice
							}))}
							totalAmount={order.products.reduce(
								(sum: number, p: OrderProduct) => sum + p.itemPrice * p.quantity,
								0
							)}
						/>
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
