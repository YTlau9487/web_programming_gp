<!-- Dialog Container -->
<div 
  role="dialog" 
  aria-modal="true"
  class="fixed top-1/2 left-1/2 z-50 grid w-full max-w-2xl sm:max-w-lg 
             -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border 
             bg-white p-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.1)] duration-200 border-hidden"
>
  <!-- Header -->
  <div class="flex flex-col gap-2 text-center sm:text-left">
    <h2 class="text-lg font-semibold leading-none">Add New Product</h2>
    <p class="text-sm text-gray-500">Fill in the details to add a new product to your store</p>
  </div>

  <!-- Form -->
  <form class="space-y-4" method="POST">
    <!-- Grid two columns -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Product Name -->
      <div class="space-y-2">
        <label for="productName" class="text-sm font-medium text-gray-700">Product Name</label>
        <input id="productName" name="productName" type="text" required
               class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                      focus:neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"/>
      </div>

      <!-- Category -->
      <div class="space-y-2">
        <label for="category" class="text-sm font-medium text-gray-700">Category</label>
        <input id="category" name="category" type="text" required
                class="w-full h-9 rounded-md border border-gray-300 px-3 py-2 text-sm 
                       focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"/>
      </div>

      <!-- Price -->
      <div class="space-y-2">
        <label for="price" class="text-sm font-medium text-gray-700">Price</label>
        <input id="price" name="price" type="number" step="0.01" required
               class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                      focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"/>
      </div>

      <!-- Stock -->
      <div class="space-y-2">
        <label for="stock" class="text-sm font-medium text-gray-700">Stock</label>
        <input id="stock" name="stock" type="number" required
               class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                      focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"/>
      </div>
    </div>

    <!-- Image URL -->
    <div class="space-y-2">
      <label for="image" class="text-sm font-medium text-gray-700">Image URL</label>
      <input id="image" name="image" type="url" required
             class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                    focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none"/>
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <label for="description" class="text-sm font-medium text-gray-700">Description</label>
      <textarea id="description" name="description" rows="4" required
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
                       focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 outline-none resize-none"></textarea>
    </div>

    <!-- Footer Buttons -->
    <div class="flex justify-end gap-2">
      <button type="button"
              class="px-4 py-2 rounded-md border text-sm font-medium text-gray-700 
                     hover:bg-gray-100">
        Cancel
      </button>
      <button type="submit"
              class="px-4 py-2 rounded-md bg-neutral-900 text-white text-sm font-medium 
                     hover:bg-neutral-800">
        Add Product
      </button>
    </div>
  </form>

  <!-- Close Button -->
  <button type="button" 
          class="absolute top-4 right-4 rounded opacity-70 hover:opacity-100 
                 transition-opacity focus:ring-2 focus:ring-neutral-400">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M6 18L18 6"/>
    </svg>
    <span class="sr-only">Close</span>
  </button>
</div>