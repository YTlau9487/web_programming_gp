<script lang="ts">
  import type { User } from '$lib/server/db/schema';
  import { ShoppingBag } from 'lucide-svelte';
  export let user: User | null = null;
  $: username = user?.username ?? 'Guest';
</script>

<nav
  class="bg-black text-white h-15 flex flex-row flex-nowrap items-center px-36 py-1.5 text-base sticky top-0"
>
  <div class="flex flex-3 items-center gap-2">
    <ShoppingBag class="inline-block"/>
    <span class="align-center">MarketPlace</span>
  </div>
  <div class="flex flex-2 shrink-0 gap-9 justify-end">
    <span>Welcome, {username}</span>

    {#if user}
      <form method="POST" action="/logout">
        <button
          type="submit"
          class="hover:underline cursor-pointer"
        >
          Logout
        </button>
      </form>
    {:else}
      <a href="/login" class="hover:underline">Login</a>
    {/if}
  </div>
</nav>
