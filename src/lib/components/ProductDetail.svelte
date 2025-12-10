<script lang="ts">
	import Star from '~icons/lucide/star';
	import StarHalf from '~icons/lucide/star-half';
	import ShoppingCart from '~icons/lucide/shopping-cart';
	import { cart } from '$lib/stores/cart';

	export let product: any;

	let quantity = 1;
	const maxStars = 5;

	const getStars = (rating: number) =>
		Array.from({ length: maxStars }, (_, i) => {
			const starNumber = i + 1;
			if (rating >= starNumber) return 'full';
			if (rating >= starNumber - 0.5) return 'half';
			return 'empty';
		});

	const image = product.images?.[0] ?? product.thumbnail;
	const name = product.title;
	const category = product.category;
	const rating = product.rating;
	const price = product.price;
	const description = product.description;
	const stock = product.stock;
	const seller = product.brand;

	let showMessage = false;

	function handleAddToCart() {
		cart.add(product);
		showMessage = true;
		setTimeout(() => {
			showMessage = false;
		}, 3000);
	}
</script>

<div class="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 bg-white rounded-lg shadow-md">
	<!-- Left: Big product photo -->
	<div class="w-full md:w-1/2">
		<img
			src={image}
			alt={name}
			class="w-full h-auto md:h-full object-contain md:object-cover rounded-lg"
		/>
	</div>

	<!-- Right: Product details -->
	<div class="w-full md:w-1/2 flex flex-col justify-start relative">
		<!-- Category label -->
		<div class="py-2">
			<span
				class="inline-block bg-black text-white px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
			>
				{category}
			</span>
		</div>

		<!-- Name -->
		<h1 class="mt-2 text-2xl font-semibold text-gray-900">
			{name}
		</h1>

		<!-- Rating  -->
		<div class="flex items-center mt-3">
			{#each getStars(rating) as type}
				{#if type === 'full'}
					<Star class="w-5 h-5 text-yellow-400 fill-yellow-400" />
				{:else if type === 'half'}
					<StarHalf class="w-5 h-5 text-yellow-400 fill-yellow-400" />
				{:else}
					<Star class="w-5 h-5 text-gray-300" />
				{/if}
			{/each}

			<span class="ml-2 text-sm text-gray-600">
				{rating.toFixed(1)} / 5
			</span>
		</div>

		<!-- Price -->
		<p class="text-3xl font-bold mt-4 text-gray-900">
			${price.toFixed(2)}
		</p>

		<!-- Details/Description -->
		<p class="mt-4 text-gray-700 leading-relaxed">
			{description}
		</p>

		<!-- Stock & Seller -->
		<div class="mt-6 space-y-2">
			<p class="text-sm text-gray-700 flex justify-between">
				<span class="font-medium">Stock:</span>
				<span class="ml-2 font-semibold text-green-600">
					{stock} units available
				</span>
			</p>

			<p class="text-sm text-gray-700 flex justify-between">
				<span class="font-medium">Seller:</span>
				<span class="ml-2 font-medium">
					{seller}
				</span>
			</p>
		</div>

		<!-- Quantity selector -->
		<div class="mt-6 flex items-center gap-3">
			<button
				type="button"
				class="h-10 w-10 rounded-xl border border-gray-200
           bg-white text-xl leading-none text-gray-700
           flex items-center justify-center hover:bg-gray-50
           active:bg-gray-100 cursor-pointer"
				onclick={() => (quantity = Math.max(1, quantity - 1))}
			>
				-
			</button>

			<span class="w-6 text-center text-base text-gray-900">
				{quantity}
			</span>

			<button
				type="button"
				class="h-10 w-10 rounded-xl border border-gray-200
           bg-white text-xl leading-none text-gray-700
           flex items-center justify-center hover:bg-gray-50
           active:bg-gray-100 cursor-pointer"
				onclick={() => (quantity += 1)}
			>
				+
			</button>
		</div>

		<!-- Floating message (absolute, above button, right side) -->
		{#if showMessage}
			<div class="absolute -top-4 right-0 flex items-center gap-2 text-sm text-emerald-600">
				<div class="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
					<span class="text-xs font-bold text-white">✓</span>
				</div>
				<span>Added to cart</span>
			</div>
		{/if}

		<!-- Add to Cart button -->
		<button
			type="button"
			class="bg-black text-white px-6 py-3 mt-6 rounded-md flex items-center justify-center gap-2 hover:bg-slate-900/90 active:bg-slate-900/70 cursor-pointer self-start md:self-end"
			onclick={handleAddToCart}
		>
			<ShoppingCart class="w-5 h-5" />
			<span>Add to Cart</span>
		</button>
	</div>
</div>
