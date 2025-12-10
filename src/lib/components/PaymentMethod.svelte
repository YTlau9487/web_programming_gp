<script lang="ts">
	import IconCreditCard from '~icons/lucide/credit-card';

	type PaymentMethodProps = {
		onBack?: () => void;
		onPlaceOrder?: () => void;
		isSubmitting?: boolean;
	};

	const { onBack, onPlaceOrder, isSubmitting = false }: PaymentMethodProps = $props();
</script>

<div
	class="bg-white max-w-3xl text-gray-900 rounded-3xl border border-gray-100 shadow-sm px-8 py-6"
>
	<!-- Header -->
	<div class="flex flex-col gap-1 mb-6">
		<h4 class="flex items-center gap-2 text-lg font-semibold">
			<IconCreditCard class="w-5 h-5 text-gray-700" />
			<span>Payment Method</span>
		</h4>
		<p class="text-sm text-gray-500">Choose your payment method</p>
	</div>

	<form
		class="space-y-5"
		onsubmit={(e) => {
			e.preventDefault();
			onPlaceOrder?.();
		}}
	>
		<!-- Payment options -->
		<div class="space-y-3">
			<!-- Credit card -->
			<label
				class="flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3 cursor-pointer"
				for="pm-card"
			>
				<input
					id="pm-card"
					type="radio"
					name="paymentMethod"
					value="card"
					checked
					class="h-4 w-4 accent-black"
				/>
				<span class="text-sm font-medium text-gray-900">Credit/Debit Card</span>
			</label>

			<!-- PayPal -->
			<label
				class="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 cursor-pointer"
				for="pm-paypal"
			>
				<input
					id="pm-paypal"
					type="radio"
					name="paymentMethod"
					value="paypal"
					class="h-4 w-4 accent-black"
				/>
				<span class="text-sm font-medium text-gray-900">PayPal</span>
			</label>

			<!-- Bank transfer -->
			<label
				class="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 cursor-pointer"
				for="pm-bank"
			>
				<input
					id="pm-bank"
					type="radio"
					name="paymentMethod"
					value="bank"
					class="h-4 w-4 accent-black"
				/>
				<span class="text-sm font-medium text-gray-900">Bank Transfer</span>
			</label>
		</div>

		<!-- Card details -->
		<div class="space-y-4">
			<!-- Card number -->
			<div>
				<label for="card-number" class="block text-sm font-medium text-gray-800 mb-1">
					Card Number
				</label>
				<input
					id="card-number"
					type="text"
					placeholder="1234 5678 9012 3456"
					class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                 text-gray-700 placeholder:text-gray-400
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
				/>
			</div>

			<!-- Expiry / CVV -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label for="card-expiry" class="block text-sm font-medium text-gray-800 mb-1">
						Expiry Date
					</label>
					<input
						id="card-expiry"
						type="text"
						placeholder="MM/YY"
						class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                   text-gray-700 placeholder:text-gray-400
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
					/>
				</div>
				<div>
					<label for="card-cvv" class="block text-sm font-medium text-gray-800 mb-1"> CVV </label>
					<input
						id="card-cvv"
						type="text"
						placeholder="123"
						class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                   text-gray-700 placeholder:text-gray-400
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
					/>
				</div>
			</div>

			<!-- Cardholder name -->
			<div>
				<label for="card-holder" class="block text-sm font-medium text-gray-800 mb-1">
					Cardholder Name
				</label>
				<input
					id="card-holder"
					type="text"
					class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                 text-gray-700 placeholder:text-gray-400
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
				/>
			</div>
		</div>

		<!-- Footer buttons -->
		<div class="pt-2 flex gap-4">
			<button
				type="button"
				disabled={isSubmitting}
				class="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-medium text-gray-800
               bg-white hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
				onclick={() => onBack?.()}
			>
				Back
			</button>
			<button
				type="submit"
				disabled={isSubmitting}
				class="flex-1 h-11 rounded-xl bg-black text-white text-sm font-medium
               hover:bg-black/90 active:bg-black/70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? 'Processing...' : 'Place Order'}
			</button>
		</div>
	</form>
</div>
