<script>
  import products from '$lib/data/products.json';
  import CartItem from '$lib/components/CartItem.svelte';
  import { ShoppingBag } from 'lucide-svelte';
</script>

<div class="drawer drawer-end">
  <input id="my-drawer-5" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <label for="my-drawer-5" class="drawer-button btn btn-primary bg-black border-none shadow-none"><ShoppingBag/></label>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-5" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 min-h-full w-120 p-4">
      <!-- Sidebar content here -->
      {#each products as product}
        <CartItem {product} />
      {/each}
    </ul>
  </div>
</div>