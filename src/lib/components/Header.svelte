<script lang="ts">
	import type { User } from '$lib/server/db/schema';
	import { ShoppingBag } from 'lucide-svelte';
	export let user: User | null = null;
	$: username = user?.username ?? 'Guest';
</script>

<nav
	class="bg-black text-white text-base sticky top-0
         px-4 py-2 h-15
         flex flex-col gap-2
         sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-36"
>
	<div class="flex items-center gap-2">
		<ShoppingBag class="inline-block" />
		<span class="font-medium">MarketPlace</span>
	</div>

	<div class="flex items-center gap-4 sm:gap-6">
		<span class="text-sm sm:text-base truncate">
			Welcome, {username}
		</span>

		{#if user}
			<form method="POST" action="/logout">
				<button type="submit" class="hover:underline cursor-pointer text-sm sm:text-base">
					Logout
				</button>
			</form>
		{:else}
			<a href="/login" class="hover:underline text-sm sm:text-base"> Login </a>
		{/if}
	</div>
</nav>
