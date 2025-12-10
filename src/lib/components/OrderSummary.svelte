<script lang="ts">
  import type { CartItem as CartItemType } from '$lib/stores/cart';

  type OrderSummaryProps = {
    items: CartItemType[];
    shipping: number;
  };

  const { items, shipping }: OrderSummaryProps = $props();

  const subtotal = $derived(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const total = $derived(subtotal + shipping);
</script>

<div class="max-w-sm bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
  <h2 class="text-xl font-semibold text-gray-900 mb-4">
    Order Summary
  </h2>

  <div class="space-y-3 mb-4">
    {#each items as item}
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-start gap-4 flex-1 min-w-0">
          <img
            src={item.thumbnail}
            alt={item.title}
            class="h-16 w-16 rounded-xl object-cover"
          />
          <div class="min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {item.title}
            </p>
            <p class="mt-1 text-xs text-gray-400">
              Qty: {item.quantity}
            </p>
          </div>
        </div>
        <p class="text-sm font-medium text-gray-900 shrink-0">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    {/each}
  </div>

  <hr class="my-3 border-gray-200" />

  <div class="space-y-2 text-sm">
    <div class="flex justify-between">
      <span class="text-gray-700">Subtotal</span>
      <span class="text-gray-900">${subtotal.toFixed(2)}</span>
    </div>
    <div class="flex justify-between">
      <span class="text-gray-700">Shipping</span>
      <span class="text-gray-900">${shipping.toFixed(2)}</span>
    </div>

    <hr class="my-3 border-gray-200" />

    <div class="flex justify-between text-base font-semibold">
      <span class="text-gray-900">Total</span>
      <span class="text-gray-900">${total.toFixed(2)}</span>
    </div>
  </div>
</div>
