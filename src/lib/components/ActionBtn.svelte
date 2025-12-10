<script>
  import { Package, ShoppingCart } from 'lucide-svelte';

  let { onOpenCart, onGoToOrders, cartCount = 0 } = $props();
</script>

<div class="flex items-center gap-3">
  <button
    onclick={() => onGoToOrders?.()}
    class="p-3 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-shadow shadow-sm cursor-pointer"
    aria-label="View orders"
  >
    <Package class="w-6 h-6 text-gray-700" />
  </button>

  <button
    onclick={() => onOpenCart?.()}
    class="relative p-3 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-shadow shadow-sm cursor-pointer"
    aria-label="Open cart"
  >
    <ShoppingCart class="w-6 h-6 text-gray-700" />
    {#if cartCount > 0}
      <span
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse"
      >
        {cartCount}
      </span>
    {/if}
  </button>
</div>