<script lang="ts">
	import { onMount } from 'svelte';

	export let items: any[] = [];
	export let value: string | null = null;

	export let onChange: ((payload: { value: string; item: any }) => void) | undefined = undefined;

	let list: any[] = [];
	$: list = items.map((item) =>
		typeof item === 'string'
			? { label: item, value: item }
			: { label: item.label ?? item.value ?? item, value: item.value ?? item }
	);

	onMount(() => {
		if (value === null && list.length > 0) {
			value = list[0].value;
		}
	});

	function select(item: any) {
		value = item.value;
		onChange?.({ value: item.value, item });
	}
</script>

<div class="inline-flex bg-gray-200 rounded-xl p-2 gap-1">
	{#each list as item}
		<button
			type="button"
			onclick={() => select(item)}
			class="min-w-[100px] px-6 py-2 rounded-lg font-medium cursor-pointer text-sm transition-all duration-200 whitespace-nowrap
             {value === item.value
				? 'bg-white text-gray-900 shadow-sm rounded-full font-semibold'
				: 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'}"
		>
			{item.label}
		</button>
	{/each}
</div>
