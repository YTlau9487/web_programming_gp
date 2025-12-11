<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ProductDetail from '$lib/components/ProductDetail.svelte';
	import CustomerReviews from '$lib/components/CustomerReviews.svelte';
	import Comment from '$lib/components/Comment.svelte';
	import AddComment from '$lib/components/AddComment.svelte';
	import ArrowLeft from '~icons/lucide/arrow-left';
	import { invalidateAll } from '$app/navigation';

	export let data;
	const product = data.product;
	const reviews = product.reviews ?? [];
	const hasPurchased = data.hasPurchased;

	async function handleCommentSubmit() {
		await invalidateAll();
	}
</script>

<Header user={data.user} />

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

    <!-- Add Comment Section - Only show if buyer has purchased this product -->
    {#if hasPurchased && data.user}
      <AddComment on:submit={handleCommentSubmit} />
    {:else if !data.user}
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p class="text-blue-800 text-sm">Sign in to leave a review</p>
      </div>
    {:else if !hasPurchased}
      <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p class="text-gray-600 text-sm">You must purchase this product to leave a review</p>
      </div>
    {/if}

    <!-- Existing Comments -->
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
