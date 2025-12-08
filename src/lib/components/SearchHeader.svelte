<script>
  import SearchBar from './SearchBar.svelte';
  import ActionBtn from './ActionBtn.svelte';
// import ShoppingCart from './ShoppingCart.svelte';

  // Use $state for reactive state
  let cartOpen = $state(false);
  let cartItems = $state([
    { name: "Wireless Earbuds", price: 89.99, quantity: 1 },
    { name: "Phone Case", price: 24.99, quantity: 2 }
  ]);

  // Use $derived for computed values
  let cartCount = $derived(cartItems.reduce((sum, i) => sum + i.quantity, 0));
  let cartTotal = $derived(cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0));

  function openCart() {
    cartOpen = true;
  }

  function goToOrders() {
    // Use goto from @sveltejs/kit if in SvelteKit
    window.location.href = '/orders';
    // or: goto('/orders');
  }

  function closeCart() {
    cartOpen = false;
  }
</script>

<header class="sticky top-0 z-30 bg-gray-50 border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- You can add logo on the left if needed -->
      <div class="flex-1 flex justify-center">
        <SearchBar />
      </div>

      <!-- Pass callbacks as props (Svelte 5 style) -->
      <ActionBtn
        {cartCount}
        onOpenCart={openCart}
        onGoToOrders={goToOrders}
      />
    </div>
  </div>

  <!-- Pass open state and close callback as props -->
  <!-- <CartSidebar
    open={cartOpen}
    items={cartItems}
    total={cartTotal}
    onClose={closeCart}
  /> -->
  <!-- <ShoppingCart
    open={cartOpen}
    items={cartItems}
    onClose={closeCart}
    onUpdateQuantity={(/** @type {{ name: string; price: number; quantity: number; }} */ item, /** @type {number} */ newQty) => {
      if (newQty === 0) {
        cartItems = cartItems.filter(i => i !== item);
      } else {
        cartItems = cartItems.map(i =>
          i === item ? { ...i, quantity: newQty } : i
        );
      }
    }}
  /> -->
</header>