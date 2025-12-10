<script>
  // lucide icons
  import IconStar from '~icons/lucide/star';
  import IconEdit from '~icons/lucide/pencil';
  import IconDelete from '~icons/lucide/trash-2';
  import IconPlus from '~icons/lucide/plus';

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      image: '/images/headphones.jpg',
      category: 'Electronics',
      price: 299.99,
      stock: 45,
      rating: 4.5,
      reviewsCount: 128
    },
    {
      id: 2,
      name: 'Smart Watch Ultra',
      image: '/images/smartwatch.jpg',
      category: 'Electronics',
      price: 449.99,
      stock: 32,
      rating: 4.7,
      reviewsCount: 95
    },
    {
      id: 3,
      name: 'Modern Sofa Set',
      image: '/images/sofa.jpg',
      category: 'Home',
      price: 899.99,
      stock: 8,
      rating: 4.8,
      reviewsCount: 45
    }
  ];
</script>

<div class="max-w-5xl bg-white rounded-3xl shadow-sm border border-gray-100">
  <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
    <h2 class="text-xl font-semibold text-gray-900">Manage Products</h2>
    <button class="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-900/90 active:bg-gray-900/70 cursor-pointer text-white text-sm font-medium flex items-center gap-2">
      <IconPlus class="w-4 h-4" />
      <span>Add Product</span>
    </button>
  </div>

  <div class="divide-y divide-gray-100">
    {#each products as product}
      <div class="px-6 py-4 flex items-center gap-4">
        <img
          src={product.image}
          alt={product.name}
          class="h-14 w-14 rounded-xl object-cover bg-gray-100"
        />

        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-semibold text-gray-900">
                {product.name}
              </div>
              <div class="mt-1 text-xs text-gray-500">
                {product.category}
              </div>
            </div>

            <div class="text-right">
              <div class="text-sm font-semibold text-gray-900">
                ${product.price}
              </div>
              <div class="mt-1 text-xs text-gray-500">
                Stock: {product.stock}
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-1 text-xs text-gray-500">
              <IconStar class="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{product.rating}</span>
              <span>·</span>
              <span>{product.reviewsCount} reviews</span>
            </div>

            <div class="flex items-center gap-2">
              <button class="px-3 py-1 rounded-xl border border-gray-200 active:border-gray-200/70 cursor-pointer text-xs text-gray-700 active:text-gray-700/70 flex items-center gap-1">
                <IconEdit class="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button class="px-3 py-1 rounded-xl border border-red-200 active:border-red-200/70 active:text-red-600/70 cursor-pointer text-xs text-red-600 flex items-center gap-1">
                <IconDelete class="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
