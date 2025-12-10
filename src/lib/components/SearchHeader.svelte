<script lang="ts">
  import SearchBar from './SearchBar.svelte';
  import ActionBtn from './ActionBtn.svelte';
  import CartItem from './CartItem.svelte';
  import { cart } from '$lib/stores/cart';
  import { derived } from 'svelte/store';
  import { fly } from 'svelte/transition';

  export let searchTerm: string = '';

  let cartOpen = false;
  const cartItemsStore = cart;

  const cartCountStore = derived(cartItemsStore, (items) =>
    items.reduce((sum, i) => sum + i.quantity, 0)
  );

  const cartTotalStore = derived(cartItemsStore, (items) =>
    items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  );

  function openCart() {
    cartOpen = true;
  }

  function closeCart() {
    cartOpen = false;
  }

  function goToOrders() {
    window.location.href = '/buyerOrders';
  }
</script>

<header class="sticky top-0 z-30 bg-gray-50 border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex-1 flex justify-center">
        <SearchBar bind:searchTerm />
      </div>

      <ActionBtn
        cartCount={$cartCountStore}
        onOpenCart={openCart}
        onGoToOrders={goToOrders}
      />
    </div>
  </div>
</header>

{#if cartOpen}
  <div class="fixed inset-0 z-40 bg-black/40 flex justify-end items-end lg:items-stretch">
    <aside
      in:fly={{ x: 400, y: 0, duration: 250 }}
      out:fly={{ x: 400, y: 0, duration: 200 }}
      class="bg-white shadow-xl p-4 flex flex-col
             w-full h-1/2 lg:w-96 lg:h-full
             rounded-t-2xl lg:rounded-none"
    >
      <header class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Your Cart</h2>
        <button
          class="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
          onclick={closeCart}
        >
          ×
        </button>
      </header>

      <div class="flex-1 overflow-y-auto space-y-3">
        {#if $cartItemsStore.length === 0}
          <p class="text-sm text-gray-500">Cart is empty.</p>
        {:else}
          {#each $cartItemsStore as item (item.id)}
            <CartItem product={item} />
          {/each}
        {/if}
      </div>

      <footer class="mt-4 border-t pt-3 flex justify-between items-center">
        <span class="font-semibold">Total:</span>
        <span class="font-bold">${$cartTotalStore.toFixed(2)}</span>
      </footer>
    </aside>
  </div>
{/if}
