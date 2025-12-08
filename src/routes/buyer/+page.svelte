<script>
	import Header from '$lib/components/Header.svelte';
	import SearchHeader from '$lib/components/SearchHeader.svelte';

	import Tabs from '$lib/components/Tabs.svelte';
	import Product from '$lib/components/Product.svelte';
</script>

<Header />
<!-- need to pass the route to the action btn -->
<SearchHeader></SearchHeader>
<div class="m-8">
<Tabs items={['pending', 'shipped', 'delivered']} />
</div>



<!-- need to filter by tabs then show the product -->

<div class="flex flex-wrap ">
<Product></Product>
<Product></Product>
<Product></Product>
</div>