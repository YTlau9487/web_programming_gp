<script lang="ts">
  import Star from '~icons/lucide/star';

  export let product: {
    reviews?: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
  };

  const reviews = (product.reviews ?? []) as {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) /
        totalReviews;

  const ratingCounts = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length
  }));

  const maxCount = Math.max(...ratingCounts.map((r) => r.count), 1);
</script>


<div class="mt-8 max-w-5xl">
	<h2 class="text-sm font-semibold text-slate-700 mb-3">Customer Reviews</h2>

	<div class="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex gap-8">
		<!-- Average score -->
		<div class="flex flex-col items-center justify-center w-1/3 border-r border-slate-100">
			<div class="flex items-center gap-2">
				<span class="text-3xl font-semibold text-slate-900">
					{averageRating.toFixed(1)}
				</span>
				<div class="flex">
					{#each Array(5) as _, i}
						<Star
							class={`w-4 h-4 ${
								i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
							}`}
						/>
					{/each}
				</div>
			</div>
			<p class="mt-2 text-xs text-slate-500">
				Based on {totalReviews} review{totalReviews === 1 ? '' : 's'}
			</p>
		</div>

		<!-- Distribution of star magnitudes -->
		<div class="flex-1 space-y-2">
			{#each ratingCounts.slice().reverse() as item}
				<div class="flex items-center gap-3 text-xs text-slate-600">
					<span class="w-8 text-right">
						{item.star} star
					</span>

					<div class="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
						<div
							class="h-full bg-slate-900"
							style={`width: ${(item.count / maxCount) * 100}%`}
						></div>
					</div>

					<span class="w-4 text-right">
						{item.count}
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>
