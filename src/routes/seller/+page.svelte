<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import ManageProducts from '$lib/components/ManageProducts.svelte';
  import AddNewProduct from '$lib/components/AddNewProduct.svelte'; 
  import EditProduct from '$lib/components/EditProduct.svelte';
  import OrderStatus from '$lib/components/OrderStatus.svelte';

  import { invalidateAll } from '$app/navigation';
  import type { Product } from '$lib/server/db/schema.js';

  export let data;

  let activeTab = 'Products';
  let showAddModal = false;
  let showEditModal = false;
  let editingProduct: Product | null = null;

  $: products = data.products || [];
  $: orders = data.orders || [];
  $: user = data.user;

  function openAddModal() {
    showAddModal = true;
  }

  function closeAddModal() {
    showAddModal = false;
  }

  function openEditModal(product: Product) {
    editingProduct = product;
    showEditModal = true;
  }

  function closeEditModal() {
    showEditModal = false;
    editingProduct = null;
  }

  // Handle delete
  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const formData = new FormData();
    formData.append('id', id.toString());

    try {
      const res = await fetch('?/deleteProduct', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        products = products.filter(p => p.id !== id);
        await invalidateAll();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeAddModal();
    }
  }

  function handleEditBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeEditModal();
    }
  }
</script>

<Header user={user} />

<div class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 py-8">
    <Tabs
      items={['Products', 'Orders']}
      bind:value={activeTab}
      class="m-4"
    />

    {#if activeTab === 'Products'}
      <div class="flex justify-center mt-8">
        <div class="w-full max-w-5xl">
          <ManageProducts
            {products}
            on:add={openAddModal}
            on:edit={(e) => openEditModal(e.detail)}
            on:delete={(e) => handleDelete(e.detail.id)}
          />
        </div>
      </div>
    {:else}
      <div class="mt-12">
        {#if orders.length === 0}
          <div class="text-center text-gray-500">
            <p>No orders yet for your products.</p>
          </div>
        {:else}
          <div class="px-4">
            <OrderStatus {orders} />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<!-- Add Product Modal -->
{#if showAddModal}
  <div 
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === 'Escape' && closeAddModal()}
    role="presentation"
  >
    <div class="w-full max-w-2xl sm:max-w-lg">
      <AddNewProduct
        on:close={closeAddModal}
        on:submit={async () => {
          closeAddModal();
          await invalidateAll();
        }}
      />
    </div>
  </div>
{/if}

<!-- Edit Product Modal -->
{#if showEditModal && editingProduct}
  <div 
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
    on:click={handleEditBackdropClick}
    on:keydown={(e) => e.key === 'Escape' && closeEditModal()}
    role="presentation"
  >
    <div class="w-full max-w-2xl sm:max-w-lg">
      <EditProduct
        product={editingProduct}
        on:close={closeEditModal}
        on:submit={async () => {
          closeEditModal();
          await invalidateAll();
        }}
      />
    </div>
  </div>
{/if}

<style>
  :global(div[role="dialog"]) {
    animation: fadeIn 0.2s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
</style>
