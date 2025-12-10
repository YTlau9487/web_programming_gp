<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import SearchHeader from '$lib/components/SearchHeader.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import Product from '$lib/components/Product.svelte';

  export let data;

  const products = data.products;

  let searchTerm = '';

  $: filteredProducts =
    searchTerm.trim() === ''
      ? products
      : products.filter((p) => {
          const q = searchTerm.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
          );
        });
</script>

<Header user={data.user} />

<SearchHeader bind:searchTerm />


<div class="flex flex-wrap justify-center gap-8">
  {#each filteredProducts as product}
    <Product {product} />
  {/each}
</div>
