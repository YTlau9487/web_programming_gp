<script lang="ts">
	import { Star, UserRound } from 'lucide-svelte';

	export let reviewerName: string;
	export let rating: number;
	export let comment: string;
	export let date: string;

	const maxStars = 5;

	// using "YYYY/MM/DD" format
	const d = new Date(date);
	const formattedDate = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(
		d.getDate()
	).padStart(2, '0')}`;
</script>

<div
	class="bg-white rounded-2xl shadow-sm border border-gray-100
         px-6 py-4 max-w-5xl"
>
	<div class="flex items-start justify-between gap-4">
		<div class="flex items-start gap-4">
			<!-- Avatar circle -->
			<div
				class="flex h-10 w-10 items-center justify-center
               rounded-full bg-gray-100 text-gray-500"
			>
				<UserRound class="w-5 h-5" />
			</div>

			<div class="space-y-1">
				<p class="font-semibold text-gray-900 text-sm">
					{reviewerName}
				</p>

				<div class="flex items-center gap-1 text-sm">
					{#each Array(maxStars) as _, i}
						<Star
							class={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
						/>
					{/each}
				</div>
			</div>
		</div>

		<p class="text-xs text-gray-400">
			{formattedDate}
		</p>
	</div>

	<p class="mt-3 text-sm leading-relaxed text-gray-600">
		{comment}
	</p>
</div>
