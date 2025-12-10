<script lang="ts">
	import IconTruck from '~icons/lucide/truck';

	type ShippingInfoProps = {
		onContinue?: () => void;
	};

	const { onContinue }: ShippingInfoProps = $props();
</script>

<div
	class="bg-white max-w-3xl text-gray-900 rounded-3xl border border-gray-100 shadow-sm px-8 py-6"
>
	<!-- Header -->
	<div class="flex flex-col gap-1 mb-6">
		<h4 class="flex items-center gap-2 text-lg font-semibold">
			<IconTruck class="w-5 h-5 text-gray-700" />
			<span>Shipping Information</span>
		</h4>
		<p class="text-sm text-gray-500">Enter your delivery address</p>
	</div>

	<!-- Form -->
	<form
		class="space-y-4"
		method="POST"
		onsubmit={(e) => {
			e.preventDefault();
			onContinue?.();
		}}
	>
		<!-- Full Name -->
		<div>
			<label for="fullName" class="block text-sm font-medium text-gray-800 mb-1"> Full Name </label>
			<input
				id="fullName"
				type="text"
				required
				class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
			/>
		</div>

		<!-- Address -->
		<div>
			<label for="address" class="block text-sm font-medium text-gray-800 mb-1"> Address </label>
			<input
				id="address"
				type="text"
				required
				class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
			/>
		</div>

		<!-- City / State -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label for="city" class="block text-sm font-medium text-gray-800 mb-1"> City </label>
				<input
					id="city"
					type="text"
					required
					class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
				/>
			</div>
			<div>
				<label for="state" class="block text-sm font-medium text-gray-800 mb-1"> State </label>
				<input
					id="state"
					type="text"
					required
					class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
				/>
			</div>
		</div>

		<!-- ZIP / Phone -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label for="zipCode" class="block text-sm font-medium text-gray-800 mb-1"> ZIP Code </label>
				<input
					id="zipCode"
					type="text"
					required
					class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
				/>
			</div>
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-800 mb-1"> Phone </label>
				<input
					id="phone"
					type="tel"
					required
					class="w-full h-11 rounded-lg bg-gray-50 border border-gray-200 px-3 text-sm
                 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
				/>
			</div>
		</div>

		<!-- Button -->
		<button
			type="submit"
			class="mt-4 w-full h-11 rounded-xl bg-black text-white text-sm font-medium
             hover:bg-black/80 active:bg-black/70 cursor-pointer"
		>
			Continue to Payment
		</button>
	</form>
</div>
