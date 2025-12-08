<script>
	const { product } = $props();
	let count = $state(0);

	function increment() {
		count++;
	}

	function decrement() {
		if (count > 0) count--;
	}
</script>

<div class="max-w-3xl mb-4 bg-white rounded-3xl shadow-sm border border-gray-100 px-6 py-4">
	<div class="flex items-center gap-6">
		<img src={product.image} alt={product.name} class="h-24 w-24 rounded-xl object-cover" />

		<div class="flex-1">
			<h3 class="text-lg font-semibold text-gray-900">{product.name}</h3>
			<p class="mt-1 text-base font-medium text-gray-700">${product.price}</p>

			<div class="mt-4 flex items-center gap-3">
				<button
					class="h-10 w-10 rounded-xl border border-gray-200
                 bg-white text-xl leading-none text-gray-700
                 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
					onclick={decrement}
				>
					-
				</button>

				<span class="w-6 text-center text-base text-gray-900">{count}</span>

				<button
					class="h-10 w-10 rounded-xl border border-gray-200
                 bg-white text-xl leading-none text-gray-700
                 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
					onclick={increment}
				>
					+
				</button>
			</div>
		</div>

		<button class="self-start text-2xl text-gray-500 hover:text-gray-700 cursor-pointer">
			×
		</button>
	</div>
</div>
