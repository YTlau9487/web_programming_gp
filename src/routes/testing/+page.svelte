<script>
        // @ts-nocheck
	import Product from "$lib/components/Product.svelte";
	import SearchHeader from "$lib/components/SearchHeader.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import OrderDetail from "$lib/components/OrderDetail.svelte";
  import ProductDetail from "$lib/components/ProductDetail.svelte";
  import OrderStatus from "$lib/components/OrderStatus.svelte";
  // import ShoppingCart from "$lib/components/ShoppingCart.svelte";
 
    let activeCategory = "Personal Info";

    function handleCategoryChange(e) {
        console.log("Selected:", e.detail.selected);
        // Load content, show section, etc.
    }


    // Simple strings
    let status = "pending";
    
    // Or objects
    let category = "electronics";
    const categories = [
        { label: "All", value: "all" },
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Books", value: "books" }
    ];


    	const filters = [
		{ label: 'All Tasks', value: 'all' },
		{ label: 'Active Only', value: 'active' },
		{ label: 'Completed', value: 'done' }
	];

	let currentFilter = 'all';

    let step = 'info';

	// Optional: listen to changes
	function onStepChange(e) {
		console.log('Step changed to:', e.detail.value);
	}

const dummyProduct = {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'Sneakers',
    name: 'Nike Air Max Infinity',
    rating: 4.7,
    reviews: 2857,
    price: 189.99,
    description: 'Experience ultimate comfort with revolutionary air cushioning technology. Perfect for running or everyday wear. Limited edition colorway.',
    stock: 8,
    seller: 'Nike Official Store'
  };

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>


<!-- Example 1: Simple strings (most common) -->


<Tabs
	items={['pending', 'shipped', 'delivered']}
	bind:value={status}
/>

<p>Current status: {status}</p>

<!-- Example 2: With custom labels and values -->
<Tabs items={filters} bind:value={currentFilter} />

Selected: {currentFilter}


<Tabs
	items={['info', 'address', 'payment', 'review']}
	bind:value={step}
	on:change={onStepChange}
/>

<Product></Product>
<!-- <Searchbar></Searchbar> -->

<SearchHeader></SearchHeader>

<OrderDetail 
  orderId="12345" 
  createdAt="2023-10-15 14:30" 
  status="Processing" 
  products={[
    { img: 'https://example.com/product1.jpg', name: 'Product 1', qty: 2 },
    { img: 'https://example.com/product2.jpg', name: 'Product 2', qty: 1 }
  ]} 
  totalAmount={49.99} 
/>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ProductDetail product={dummyProduct} />
  </div>

  <OrderStatus />

  <!-- <ShoppingCart /> -->