<script lang="ts">
  import Search from '~icons/lucide/search';

  export let searchTerm: string = '';
</script>

<div class="relative flex-1 max-w-2xl mx-8">
  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Search class="w-5 h-5 text-gray-400" />
  </div>
  <input
    placeholder="Search products or categories..."
    bind:value={searchTerm}
    class="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow hover:border-gray-400"
  />
</div>
