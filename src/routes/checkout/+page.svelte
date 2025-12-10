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
	let isSubmitting = $state(false);

	const items = $derived($cart as CartItemType[]);
	const shipping = 9.99;

	let shippingData = $state({
		fullName: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
		phone: ''
	});

	let paymentData = $state({
		cardNumber: '',
		cardExpiry: '',
		cardCvv: '',
		cardHolder: ''
	});

	function goToPayment() {
		const fullName = (document.getElementById('fullName') as HTMLInputElement)?.value || '';
		const address = (document.getElementById('address') as HTMLInputElement)?.value || '';
		const city = (document.getElementById('city') as HTMLInputElement)?.value || '';
		const state = (document.getElementById('state') as HTMLInputElement)?.value || '';
		const zipCode = (document.getElementById('zipCode') as HTMLInputElement)?.value || '';
		const phone = (document.getElementById('phone') as HTMLInputElement)?.value || '';

		shippingData = { fullName, address, city, state, zipCode, phone };
		currentStep = 2;
	}

	function goBackToShipping() {
		currentStep = 1;
	}

	async function placeOrder() {
		isSubmitting = true;
		try {
			const cardNumber = (document.getElementById('card-number') as HTMLInputElement)?.value || '';
			paymentData = { ...paymentData, cardNumber };

			const formData = new FormData();
			formData.append('fullName', shippingData.fullName);
			formData.append('address', shippingData.address);
			formData.append('city', shippingData.city);
			formData.append('state', shippingData.state);
			formData.append('zipCode', shippingData.zipCode);
			formData.append('phone', shippingData.phone);
			formData.append('cardNumber', paymentData.cardNumber);

			const cartItems = items.map((item) => ({
				id: item.id,
				quantity: item.quantity,
				price: item.price
			}));
			formData.append('cartItems', JSON.stringify(cartItems));

			await fetch('?/placeOrder', {
				method: 'POST',
				body: formData
			});

			for (const item of items) {
				cart.remove(item.id);
			}

			currentStep = 3;

			setTimeout(() => {
				goto('/buyer');
			}, 3000);
		} catch (error) {
			console.error('Error placing order (network/JS):', error);
			currentStep = 3;
			setTimeout(() => {
				goto('/buyer');
			}, 3000);
		} finally {
			isSubmitting = false;
		}
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
		<div class="flex items-center justify-center mt-10">
			<OrderSucessful />
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
			<div>
				{#if currentStep === 1}
					<ShippingInfo onContinue={goToPayment} />
				{:else}
					<PaymentMethod onBack={goBackToShipping} onPlaceOrder={placeOrder} {isSubmitting} />
				{/if}
			</div>

			<OrderSummary {items} {shipping} />
		</div>
	{/if}
</div>
