<script>

  import { Star, ShoppingCart } from '@lucide/svelte';

  export let product = {
    image: '',
    category: '',
    name: '',
    rating: 0,
    reviews: 0,
    price: 0,
    description: '',
    stock: 0,
    seller: ''
  };

  let quantity = 1;
</script>

<div class="flex flex-row gap-8 p-8 bg-white rounded-lg shadow-md">
  <!-- Left: Big product photo -->
  <img 
    src={product.image} 
    alt={product.name} 
    class="w-1/2 h-auto object-cover rounded-lg"
  />

  <!-- Right: Product details -->
  <div class="w-1/2 flex flex-col justify-start">
    <!-- Category label -->
     <div class="py-4">
  <span class="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
  {product.category}
</span> 
  </div>
    <!-- Rating and reviews -->
    <div class="flex items-center mt-2">
      {#each {length: 5} as _, i}
        <Star 
          size={20} 
          class={(i < Math.floor(product.rating)) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300 fill-none'} 
        />
      {/each}
      <span class="ml-2 text-gray-600">
        ({product.reviews} reviews)
      </span>
    </div>

    <!-- Price -->
    <p class="text-2xl font-bold mt-4 text-black">
      ${product.price.toFixed(2)}
    </p>

    <!-- Details/Description -->
     
    <p class="mt-4 text-gray-700">
      {product.description}
    </p>


    <!-- Stock-->
    <div class="space-y-3">
      
      <p class="text-gray-700 flex justify-between">
        <span class="font-medium order-1 ...">Stock:</span>
        <span class="ml-2 font-bold text-green-600 order-2 ...">{product.stock} units available</span>
      </p>
    
      <!-- Seller -->
      <p class="text-gray-700 flex justify-between">
        <span class="font-medium order-1 ...">Seller:</span>
        <span class="ml-2 font-medium order-2 ...">{product.seller}</span>
      </p>
    </div>



    <!-- Quantity selector -->
    <div class="flex items-center mt-4">
      <button 
        on:click={() => quantity = Math.max(1, quantity - 1)} 
        class="bg-gray-200 text-black px-4 py-2 rounded-l-md hover:bg-gray-300"
      >
        -
      </button>
      <span class="bg-gray-100 text-black px-6 py-2 border-x border-gray-300">
        {quantity}
      </span>
      <button 
        on:click={() => quantity += 1} 
        class="bg-gray-200 text-black px-4 py-2 rounded-r-md hover:bg-gray-300"
      >
        +
      </button>
    </div>

    <!-- Add to Cart button -->
    <button class="bg-black text-white px-6 py-3 mt-6 rounded-md flex items-center justify-center hover:bg-gray-800">
      <ShoppingCart size={20} class="mr-2" />
      Add to Cart
    </button>
  </div>
</div>