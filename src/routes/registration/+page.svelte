<div
	class="h-svh w-full bg-linear-to-tr from-stone-200 to-slate-300 flex justify-center items-center"
>
	<!-- Login box -->
	<div
		class="bg-[#FFFFFF]/60 w-[450px] min-h-[25%] rounded-lg backdrop-blur-sm p-4 md:p-8 text-black text-center shadow-[0px_0px_5px_2px_rgba(100,100,111,0.15)]"
	>
		<h1 class="text-3xl max-md:text-2xl mb-4">Sign Up</h1>

		<div class="relative mb-4">
			<input type="text" class="bg-white border-white/50 rounded-lg w-full p-2 text-sm" placeholder="Username"/>
		</div>

		<div class="relative mb-4">
			<input
				type="text"
				class="bg-white border-white/50 rounded-lg w-full p-2 text-sm"
				placeholder="Email address"
			/>
		</div>

		<div class="relative mb-4">
			<input type="password" class="bg-white border-white/50 rounded-lg w-full p-2 text-sm" placeholder="Password"/>
		</div>

		<div class="relative mb-4">
			<select name="roles" class="bg-white border-white/50 rounded-lg w-full p-2 text-sm">
				<option value="">--Select Role--</option>
				<option value="buyer">Buyer</option>
				<option value="seller">Seller</option>
			</select>
		</div>

		<button
			type="submit"
			class="bg-black text-white p-2 rounded-lg min-w-48 hover:opacity-65 transition duration-150 ease-in-out active:opacity-50 cursor-pointer"
			>Sign Up</button
		>

		<span class="block text-sm mt-5"
			>Already have an account? <a href="/login" class="hover:underline">Sign In</a></span
		>
	</div>
</div>
