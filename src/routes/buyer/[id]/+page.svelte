<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ProductDetail from '$lib/components/ProductDetail.svelte';
	import CustomerReviews from '$lib/components/CustomerReviews.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	export let data;
	const product = data.product;
	const reviews = product.reviews ?? [];
</script>

<Header />

<div class="bg-slate-50 min-h-screen">
  <div class="mx-auto max-w-5xl px-4 py-8 space-y-6">
    <!-- Back button -->
    <a
      href="/buyer"
      class="inline-flex items-center gap-2 rounded-full px-4 py-2
             bg-slate-100 text-slate-800 text-sm font-medium
             hover:bg-slate-200 hover:text-slate-900
             transition-colors"
    >
      <ArrowLeft class="w-4 h-4" />
      <span>Back to Products</span>
    </a>

    <ProductDetail {product} />

    <CustomerReviews {product} />

    {#each reviews as r}
      <Comment
        reviewerName={r.reviewerName}
        rating={r.rating}
        comment={r.comment}
        date={r.date}
      />
    {/each}
  </div>
</div>
