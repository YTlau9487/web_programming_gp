<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SearchHeader from '$lib/components/SearchHeader.svelte';
	import Product from '$lib/components/Product.svelte';

	export let data;

	const products = data.products;

	let searchTerm = '';

	$: filteredProducts =
		searchTerm.trim() === ''
			? products
			: products.filter((p) => {
					const q = searchTerm.toLowerCase();
					return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
				});
</script>

<Header user={data.user} />

<SearchHeader bind:searchTerm />

<div
	class="grid gap-8 px-4
         sm:grid-cols-2
         lg:grid-cols-3
         xl:grid-cols-4"
>
	{#each filteredProducts as product}
		<Product {product} />
	{/each}
</div>
