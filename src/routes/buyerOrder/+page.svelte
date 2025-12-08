<script>
	import OrderDetail from '$lib/components/OrderDetail.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import { ArrowLeft } from 'lucide-svelte';
</script>

<div class=" p-2 mb-4 shadow-[0px_5px_3px_0px_rgba(0,0,0,0.1)]">
	<button class="rounded-md ml-4 p-2 text-center hover:bg-gray-50 cursor-pointer">
		<ArrowLeft class="inline-block w-5 h-5 mr-2" />
		Back to Shopping
	</button>
</div>
<div class="ml-4 mr-4">
	<p class="p-4 mb-4 text-xl">My Orders</p>

	<div class="mb-4">
		<Tabs items={['Active Orders', 'Completed', 'Cancelled']} />
	</div>

	<OrderDetail
		orderId="12345"
		createdAt="2023-10-15 14:30"
		status="Processing"
		products={[
			{ img: 'https://example.com/product1.jpg', name: 'Product 1', qty: 2 },
			{ img: 'https://example.com/product2.jpg', name: 'Product 2', qty: 1 }
		]}
		totalAmount={49.99}
	/>
	<OrderDetail
		orderId="12345"
		createdAt="2023-10-15 14:30"
		status="pending"
		products={[
			{ img: 'https://example.com/product1.jpg', name: 'Product 1', qty: 2 },
			{ img: 'https://example.com/product2.jpg', name: 'Product 2', qty: 1 }
		]}
		totalAmount={49.99}
	/>
	<OrderDetail
		orderId="12345"
		createdAt="2023-10-15 14:30"
		status="shipped"
		products={[
			{ img: 'https://example.com/product1.jpg', name: 'Product 1', qty: 2 },
			{ img: 'https://example.com/product2.jpg', name: 'Product 2', qty: 1 }
		]}
		totalAmount={49.99}
	/>
	<OrderDetail
		orderId="12345"
		createdAt="2023-10-15 14:30"
		status="delivered"
		products={[
			{ img: 'https://example.com/product1.jpg', name: 'Product 1', qty: 2 },
			{ img: 'https://example.com/product2.jpg', name: 'Product 2', qty: 1 }
		]}
		totalAmount={49.99}
	/>
	<OrderDetail
		orderId="12345"
		createdAt="2023-10-15 14:30"
		status="cancelled"
		products={[
			{ img: 'https://example.com/product1.jpg', name: 'Product 1', qty: 2 },
			{ img: 'https://example.com/product2.jpg', name: 'Product 2', qty: 1 }
		]}
		totalAmount={49.99}
	/>
</div>
