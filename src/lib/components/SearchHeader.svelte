<script lang="ts">
	import SearchBar from './SearchBar.svelte';
	import ActionBtn from './ActionBtn.svelte';
	import CartItem from './CartItem.svelte';
	import { cart } from '$lib/stores/cart';
	import { derived, writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let searchTerm: string = '';

	let cartOpen = false;
	const productStockStore = writable(new Map<number, number>());
	const cartItemsStore = cart;

	const cartCountStore = derived(cartItemsStore, (items) =>
		items.reduce((sum, i) => sum + i.quantity, 0)
	);

	const cartTotalStore = derived(cartItemsStore, (items) =>
		items.reduce((sum, i) => sum + i.price * i.quantity, 0)
	);

	// Derived store to check if any cart item is out of stock or quantity exceeds stock
	const hasOutOfStockItems = derived(
		[cartItemsStore, productStockStore],
		([$items, $stock]) => {
			console.log('[SearchHeader] Checking stock. Items:', $items.map(i => ({ id: i.id, qty: i.quantity, stock: $stock.get(i.id) })));
			return $items.some(item => {
				const stock = $stock.get(item.id) ?? 0;
				// Block if: stock is 0 OR cart quantity exceeds available stock
				return stock <= 0 || item.quantity > stock;
			});
		}
	);

	// Fetch product stock on mount
	onMount(async () => {
		try {
			console.log('[SearchHeader] Fetching products...');
			const response = await fetch('/api/products');
			if (response.ok) {
				const products = await response.json();
				const stockMap = new Map<number, number>(
					products.map((p: any) => [p.id as number, p.stock as number])
				);
				productStockStore.set(stockMap);
				console.log('[SearchHeader] Stock fetched:', Array.from(stockMap.entries()));
			}
		} catch (error) {
			console.error('Failed to fetch product stock:', error);
		}
	});

	function openCart() {
		cartOpen = true;
	}

	function closeCart() {
		cartOpen = false;
	}

	function goToOrders() {
		window.location.href = '/buyerOrders';
	}

	async function proceedToCheckout() {
		if ($hasOutOfStockItems) {
			alert('Cannot proceed: Some items in your cart are out of stock. Please remove them before checking out.');
			return;
		}
		console.log('proceedToCheckout clicked'); // check if this logs
		cartOpen = false;
		await goto('/checkout');
	}
</script>

<header class="sticky top-0 z-51 bg-gray-50 border-b border-gray-200 mb-4">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<div class="flex-1 flex justify-center">
				<SearchBar bind:searchTerm />
			</div>

			<ActionBtn cartCount={$cartCountStore} onOpenCart={openCart} onGoToOrders={goToOrders} />
		</div>
	</div>
</header>

{#if cartOpen}
	<div class="fixed inset-0 z-53 bg-black/40 flex justify-end items-end lg:items-stretch">
		<aside
			in:fly={{ x: 400, y: 0, duration: 250 }}
			out:fly={{ x: 400, y: 0, duration: 200 }}
			class="bg-white shadow-xl p-4 flex flex-col
             w-full h-1/2 lg:w-96 lg:h-full
             rounded-t-2xl lg:rounded-none"
		>
			<header class="flex items-center justify-between mb-4">
				<h2 class="text-lg font-semibold">Your Cart</h2>
				<button
					class="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
					onclick={closeCart}
				>
					×
				</button>
			</header>

			<div class="flex-1 overflow-y-auto space-y-3">
				{#if $cartItemsStore.length === 0}
					<p class="text-sm text-gray-500">Cart is empty.</p>
				{:else}
					{#each $cartItemsStore as item (item.id)}
						<CartItem product={item} />
					{/each}
				{/if}
			</div>

			<footer class="mt-4 border-t pt-3 flex flex-col gap-3">
				<div class="flex justify-between items-center">
					<span class="font-semibold">Total:</span>
					<span class="font-bold">${$cartTotalStore.toFixed(2)}</span>
				</div>

				{#if $hasOutOfStockItems}
					<div class="p-2 bg-red-50 border border-red-300 rounded text-red-700 text-xs">
						⚠️ Some items in your cart are out of stock. Please remove them to proceed.
					</div>
				{/if}

				<button
					class="w-full rounded-md bg-black text-white text-sm font-medium
           py-2.5 hover:bg-black/90 active:bg-black/70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					onclick={proceedToCheckout}
					disabled={$cartItemsStore.length === 0 || $hasOutOfStockItems}
				>
					{$hasOutOfStockItems ? 'Out of Stock Items' : 'Proceed to checkout'}
				</button>
			</footer>
		</aside>
	</div>
{/if}
