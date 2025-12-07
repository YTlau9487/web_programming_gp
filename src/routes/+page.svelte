<script lang="ts">
  export let data; // contains { user } from +layout.server.ts
  import Header from '$lib/components/header.svelte';
</script>

<Header user={data.user} />

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
