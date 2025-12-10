import tailwindcss from '@tailwindcss/vite';
import unicons from 'unplugin-icons/vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), unicons({compiler: "svelte"})]
});
