<script lang="ts">
	import { Star, ShoppingCart } from 'lucide-svelte';
	import { cart, type ProductData } from '$lib/stores/cart';

	const { product } = $props<{ product: ProductData }>();
</script>

<div class="max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
	<img
		src={product.thumbnail}
		alt={product.title}
		class="w-full max-h-60 object-contain bg-slate-100"
	/>

	<div class="p-6 space-y-3">
		<span class="inline-block bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
			{product.category}
		</span>

		<h2 class="text-xl font-semibold text-slate-900">
			{product.title}
		</h2>

		<p class="text-sm text-slate-600 leading-relaxed">
			{product.description}
		</p>

		<div class="flex items-center gap-2 text-sm text-slate-700">
			<Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
			<span class="font-medium">{product.rating}</span>
			<span class="text-slate-400">(Stock: {product.stock})</span>
		</div>

		<div class="flex items-center justify-between text-sm text-slate-900">
			<span class="text-lg font-semibold">
				${product.price}
			</span>
			<span class="text-slate-500">
				by {product.brand}
			</span>
		</div>

		<div class="pt-2 flex gap-3">
			<a
				href={`/buyer/${product.id}`}
				class="flex-1 border border-slate-200 rounded-2xl py-2.5 text-sm font-medium cursor-pointer text-slate-800 hover:bg-slate-50/90 active:bg-slate-50/50 text-center flex items-center justify-center"
			>
				View Details
			</a>

			<button
				class="flex-1 bg-slate-900 text-white rounded-2xl py-2.5 text-sm font-medium cursor-pointer hover:bg-slate-900/90 active:bg-slate-900/70 flex items-center justify-center gap-2"
				onclick={() => cart.add(product)}
			>
				<ShoppingCart class="w-4 h-4" />
				<span>Add to Cart</span>
			</button>
		</div>
	</div>
</div>
