<script lang="ts">
  import { cart, type CartItem as CartItemType } from '$lib/stores/cart';

  const { product } = $props<{ product: CartItemType }>();

  const increment = () => {
    cart.changeQuantity(product.id, +1);
  };

  const decrement = () => {
    cart.changeQuantity(product.id, -1);
  };

  const removeItem = () => {
    cart.remove(product.id);
  };
</script>

<div class="max-w-3xl mb-4 bg-white rounded-3xl shadow-[0px_0px_3px_0px_rgba(0,0,0,0.1)] border border-gray-100 px-6 py-4">
  <div class="flex items-center gap-6">
    <img src={product.thumbnail} alt={product.title} class="h-24 w-24 rounded-xl object-cover" />

    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-900">{product.title}</h3>
      <p class="mt-1 text-base font-medium text-gray-700">
        ${product.price}
      </p>

      <div class="mt-4 flex items-center gap-3">
        <button
          class="h-10 w-10 rounded-xl border border-gray-200
                 bg-white text-xl leading-none text-gray-700
                 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
          onclick={decrement}
        >
          -
        </button>

        <span class="w-6 text-center text-base text-gray-900">
          {product.quantity}
        </span>

        <button
          class="h-10 w-10 rounded-xl border border-gray-200
                 bg-white text-xl leading-none text-gray-700
                 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
          onclick={increment}
        >
          +
        </button>
      </div>
    </div>

    <button
      class="self-start text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
      onclick={removeItem}
    >
      ×
    </button>
  </div>
</div>
