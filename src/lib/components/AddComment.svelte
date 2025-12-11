<script lang="ts">
	import IconStar from '~icons/lucide/star';

	// callback prop，父層用 <AddComment onSubmit={...} />
	export let onSubmit: (() => void) | undefined;

	let rating = 5;
	let comment = '';
	let isSubmitting = false;

	async function handleSubmit() {
		if (!comment.trim()) {
			alert('Please enter a comment');
			return;
		}

		isSubmitting = true;

		try {
			const formData = new FormData();
			formData.append('rating', String(rating));
			formData.append('comment', comment.trim());

			const res = await fetch('?/addComment', {
				method: 'POST',
				body: formData
			});

			let result: any = null;
			try {
				result = await res.json();
			} catch {
				// ignore parse error
			}

			console.log('addComment response', res.status, result);

			if (res.ok) {
				onSubmit?.();
				comment = '';
				rating = 5;
			} else {
				alert(result?.error ?? `Failed to submit comment (status ${res.status})`);
			}
		} catch (error) {
			console.error('Error submitting comment:', error);
			alert('Error submitting comment');
		} finally {
			isSubmitting = false;
		}
	}

	function setRating(star: number) {
		rating = star;
	}
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
	<h3 class="text-lg font-semibold text-gray-900 mb-4">Leave a Review</h3>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
		class="space-y-4"
	>
		<!-- Rating -->
		<div class="space-y-2">
			<label for="rating" class="text-sm font-medium text-gray-700">Rating</label>
			<div class="flex gap-2">
				{#each [1, 2, 3, 4, 5] as star}
					<button
						type="button"
						onclick={() => setRating(star)}
						class="transition-colors cursor-pointer"
					>
						<IconStar
							class={`w-6 h-6 ${
								star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
							}`}
						/>
					</button>
				{/each}
			</div>
			<p class="text-xs text-gray-500">
				Selected: {rating} star{rating !== 1 ? 's' : ''}
			</p>
		</div>

		<!-- Comment -->
		<div class="space-y-2">
			<label for="comment" class="text-sm font-medium text-gray-700"> Your Review </label>
			<textarea
				id="comment"
				bind:value={comment}
				placeholder="Share your experience with this product..."
				rows="4"
				class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
               focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
			></textarea>
		</div>

		<!-- Submit Button -->
		<button
			type="submit"
			disabled={isSubmitting}
			class="w-full px-4 py-2 rounded-md bg-black text-white text-sm font-medium
             hover:bg-black/80 active:bg-black/70 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer
             transition-colors"
		>
			{isSubmitting ? 'Submitting...' : 'Submit Review'}
		</button>
	</form>
</div>
