<script lang="ts">
    /** 
	 * items = array of tabs
	 * Can be: strings only → ["Home", "Profile", "Settings"]
	 * Or objects → [{ label: "Home", value: "home" }, ...]
	 */
	export let items: any[] = [];

	/** Currently active tab (two-way bindable) */
	export let value: string | null = null;

	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	// Normalize items so we always have .label and .value
	let list: any[];
	$: list = items.map(item => 
		typeof item === 'string' 
			? { label: item, value: item }
			: { label: item.label ?? item.value ?? item, value: item.value ?? item }
	);

	// Auto-select first item if nothing is selected
	onMount(() => {
		if (value === null && list.length > 0) {
			value = list[0].value;
		}
	});

	function select(item: any) {
		value = item.value;
		dispatch('change', { value: item.value, item });
	}
</script>

<div class="inline-flex bg-gray-200 rounded-xl p-2 gap-1">
	{#each list as item}
		<button
			on:click={() => select(item)}
			class="min-w-[100px] px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap
			       {value === item.value
				? 'bg-white text-gray-900 shadow-sm rounded-full font-semibold'
				: 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'}"
		>
			{item.label}
		</button>
	{/each}
</div>