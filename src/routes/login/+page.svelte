<script lang="ts">
	export let form;
</script>

<div
	class="h-svh w-full bg-linear-to-tr from-stone-200 to-slate-300 flex justify-center items-center"
>
	<!-- Login box -->
	<form
		method="POST"
		action="?/login"
		autocomplete="off"
		class="bg-[#FFFFFF]/60 w-[450px] min-h-[25%] rounded-lg backdrop-blur-sm p-4 md:p-8 text-black text-center shadow-[0px_0px_5px_2px_rgba(100,100,111,0.15)]"
	>
		<h1 class="text-3xl max-md:text-2xl mb-4">Login</h1>

		<div class="relative mb-4">
			<input
				type="text"
				name="email"
				class="bg-white border-white/50 rounded-lg w-full p-2 text-sm"
				placeholder="Email address"
			/>
		</div>

		<div class="relative mb-4">
			<input
				type="password"
				name="password"
				class="bg-white border-white/50 rounded-lg w-full p-2 text-sm"
				placeholder="Password"
				required
			/>
		</div>

		{#if form?.error}
			<p class="text-red-500 mb-2">{form.error}</p>
		{/if}

		{#if form?.success}
			<p class="text-green-600 mb-2">Login success (session not implemented yet)</p>
		{/if}

		<button
			type="submit"
			class="bg-black text-white p-2 rounded-lg min-w-48 hover:opacity-65 transition duration-150 ease-in-out active:opacity-50 cursor-pointer"
			>Sign In</button
		>

		<span class="block text-sm mt-5"
			>Don't have any account? <a href="/registration" class="hover:underline">Sign up</a></span
		>
	</form>
</div>
