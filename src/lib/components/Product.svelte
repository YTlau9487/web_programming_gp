
<script>
  export let product = {
    category: "Electronics",
    name: "Sample Product",
    price: "$19.99",
    stock: 20,
    description: "This is a sample product description.",
    imageUrl: "../src/lib/assets/Product+Showcase-1-2997267426.jpg",
    sellerName: "BestSeller Inc.",
    star: 4.5
  };
</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg mx-4">
  <img class="w-full" src={product.imageUrl} alt={product.name} />
  <div class="px-6 py-4">
    <div class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {product.category}
    </div>
    <div class="font-bold text-xl mb-2">{product.name}</div>
    <p class="text-gray-700 text-base">{product.description}</p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      ⭐ {product.star}
    </span>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{product.price}</span>
    <span class="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Stock: {product.stock}</span>
  </div>
  <div class="px-6 pt-4 pb-2 text-gray-600 text-sm">
    by {product.sellerName}
  </div>
  <div class="px-6 pt-4 flex gap-4 pb-2">
    <button class=" hover:bg-green-700  font-bold py-2 px-4 rounded">
      View Details
    </button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add to Cart
    </button>

  </div>
</div>

