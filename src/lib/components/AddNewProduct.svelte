<script lang="ts">
  // Parent can pass these callbacks:
  // <AddNewProduct onSubmit={() => ...} onClose={() => ...} />
  export let onSubmit: (() => void) | undefined;
  export let onClose: (() => void) | undefined;

  type FormDataShape = {
    productName: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    description: string;
  };

  let formData: FormDataShape = {
    productName: '',
    category: '',
    price: 0,
    stock: 0,
    image: '',
    description: ''
  };

  function handleClose() {
    onClose?.();
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('category', formData.category);
    data.append('price', formData.price.toString());
    data.append('stock', formData.stock.toString());
    data.append('image', formData.image);
    data.append('description', formData.description);

    try {
      const res = await fetch('/seller?/addProduct', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        onSubmit?.();
      } else {
        console.error('Add product failed with status', res.status);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  function handleCancel() {
    onClose?.();
  }
</script>

<!-- Dialog Container -->
<div
  role="dialog"
  aria-modal="true"
  class="fixed top-1/2 left-1/2 z-50 grid w-full max-w-2xl sm:max-w-lg
         -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border
         bg-white p-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.1)] duration-200"
>
  <!-- Header -->
  <div class="flex flex-col gap-2 text-center sm:text-left">
    <h2 class="text-lg font-semibold leading-none">Add New Product</h2>
    <p class="text-sm text-gray-500">
      Fill in the details to add a new product to your store
    </p>
  </div>

  <!-- Form -->
  <form class="space-y-4" onsubmit={handleSubmit}>
    <div class="grid grid-cols-2 gap-4">
      <!-- Product Name -->
      <div class="space-y-2">
        <label for="productName" class="text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          id="productName"
          name="productName"
          type="text"
          bind:value={formData.productName}
          required
          class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm
                 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"
        />
      </div>

      <!-- Category -->
      <div class="space-y-2">
        <label for="category" class="text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          bind:value={formData.category}
          required
          class="w-full h-9 rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"
        />
      </div>

      <!-- Price -->
      <div class="space-y-2">
        <label for="price" class="text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          bind:value={formData.price}
          required
          class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm
                 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"
        />
      </div>

      <!-- Stock -->
      <div class="space-y-2">
        <label for="stock" class="text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          bind:value={formData.stock}
          required
          class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm
                 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"
        />
      </div>
    </div>

    <!-- Image URL -->
    <div class="space-y-2">
      <label for="image" class="text-sm font-medium text-gray-700">
        Image URL
      </label>
      <input
        id="image"
        name="image"
        type="url"
        bind:value={formData.image}
        required
        class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm
               focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"
      />
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <label for="description" class="text-sm font-medium text-gray-700">
        Description
        <span class="text-gray-500 text-xs">(Optional)</span>
      </label>
      <textarea
        id="description"
        name="description"
        rows="4"
        bind:value={formData.description}
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
               focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none resize-none"
      ></textarea>
    </div>

    <!-- Footer Buttons -->
    <div class="flex justify-end gap-2">
      <button
        type="button"
        onclick={handleCancel}
        class="px-4 py-2 rounded-md border text-sm font-medium text-gray-700
               hover:bg-gray-100/80 active:bg-gray-100/70 active:text-gray-700/70 cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 rounded-md bg-black text-white text-sm font-medium
               hover:bg-black/80 active:bg-black/70 cursor-pointer"
      >
        Add Product
      </button>
    </div>
  </form>

  <!-- Close Button -->
  <button
    type="button"
    onclick={handleClose}
    class="absolute top-4 right-4 rounded opacity-70 hover:opacity-100
           transition-opacity focus:ring-2 focus:ring-neutral-400"
    aria-label="Close dialog"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-gray-600 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 6l12 12M6 18L18 6"
      />
    </svg>
  </button>
</div>
