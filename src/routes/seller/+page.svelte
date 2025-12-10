<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  export let data;
</script>

<Header user={data.user} />