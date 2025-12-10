<script lang="ts">
	import ShippingInfo from '$lib/components/ShippingInfo.svelte';
	import PaymentMethod from '$lib/components/PaymentMethod.svelte';
	import OrderSummary from '$lib/components/OrderSummary.svelte';
	import OrderSucessful from '$lib/components/OrderSucessful.svelte';
	import IconCheck from '~icons/lucide/check';

	import { cart, type CartItem as CartItemType } from '$lib/stores/cart';
	import { goto } from '$app/navigation';

	// 1 = Shipping, 2 = Payment, 3 = Success
	let currentStep = $state(1);

	// cart is a store of CartItemType[]
	const items = $derived($cart as CartItemType[]);
	const shipping = 9.99;

	function goToPayment() {
		currentStep = 2;
	}

	function goBackToShipping() {
		currentStep = 1;
	}

	function placeOrder() {
		// remove all items from cart
		for (const item of items) {
			cart.remove(item.id);
		}

		currentStep = 3;

		setTimeout(() => {
			goto('/buyer');
		}, 3000);
	}
</script>

<div class="min-h-screen bg-[#f6f7fb] px-6 py-6">
	<!-- Step header / timeline -->
	<div class="mb-6 flex items-center gap-4">
		<!-- Step 1 -->
		<div class="flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full border text-sm
          {currentStep > 1
					? 'bg-green-500 border-green-500 text-white'
					: currentStep === 1
						? 'bg-black text-white border-black'
						: 'bg-white text-gray-700 border-gray-300'}"
			>
				{#if currentStep > 1}
					<IconCheck class="w-4 h-4" />
				{:else}
					1
				{/if}
			</div>
			<span class={currentStep >= 1 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
				Shipping
			</span>
		</div>

		<div class="h-px flex-1 bg-gray-200"></div>

		<!-- Step 2 -->
		<div class="flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full border text-sm
          {currentStep === 2
					? 'bg-black text-white border-black'
					: 'bg-white text-gray-700 border-gray-300'}"
			>
				2
			</div>
			<span class={currentStep === 2 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
				Payment
			</span>
		</div>
	</div>

	{#if currentStep === 3}
		<!-- Success: center in page -->
		<div class="flex items-center justify-center mt-10">
			<OrderSucessful />
		</div>
	{:else}
		<!-- Steps 1–2: 2-column layout -->
		<div class="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
			<div>
				{#if currentStep === 1}
					<ShippingInfo onContinue={goToPayment} />
				{:else}
					<PaymentMethod onBack={goBackToShipping} onPlaceOrder={placeOrder} />
				{/if}
			</div>

			<OrderSummary {items} {shipping} />
		</div>
	{/if}
</div>
