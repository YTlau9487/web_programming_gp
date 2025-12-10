<script lang="ts">
	import ShoppingBag from '~icons/lucide/shopping-bag';
	import LogOut from '~icons/lucide/log-out';
	import LogIn from '~icons/lucide/log-in';

	type HeaderUser = {
		id: string;
		username: string;
		role: string;
	};

	export let user: HeaderUser | null = null;
	$: username = user?.username ?? 'Guest';
</script>

<nav
  class="bg-black text-white text-base sticky top-0
         px-4 py-3
         flex flex-col gap-2
         sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-2
         lg:px-36 lg:h-15"
>

	<div class="flex items-center gap-2">
		<ShoppingBag class="inline-block" />
		<span class="font-medium">MarketPlace</span>
	</div>

	<div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
		<span class="text-xs sm:text-sm md:text-base truncate max-w-36 sm:max-w-xs">
			Welcome, {username}
		</span>

		{#if user}
			<form method="POST" action="/logout">
				<button
					type="submit"
					class="inline-flex items-center gap-2 rounded-full
                 border-none bg-transparent
                 px-3 py-1 text-xs sm:text-sm md:text-base
                 hover:bg-white/20 transition-colors cursor-pointer"
				>
					<LogOut class="w-4 h-4" />
					<span>Logout</span>
				</button>
			</form>
		{:else}
			<a
				href="/login"
				class="inline-flex items-center gap-2 rounded-full
               border-none bg-transparent
               px-3 py-1 text-xs sm:text-sm md:text-base
               hover:bg-white/20 transition-colors"
			>
				<LogIn class="w-4 h-4" />
				<span>Login</span>
			</a>
		{/if}
	</div>
</nav>
