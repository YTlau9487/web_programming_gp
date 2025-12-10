<div class="lg:col-span-2 space-y-6">
  <!-- Card -->
  <div class="bg-white text-gray-900 flex flex-col gap-6 rounded-xl border shadow-sm">
    <!-- Card Header -->
    <div class="grid gap-1.5 px-6 pt-6 border-b pb-6">
      <h4 class="flex items-center gap-2 text-lg font-semibold leading-none">
        <!-- Truck Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
          <circle cx="17" cy="18" r="2"/>
          <circle cx="7" cy="18" r="2"/>
        </svg>
        Shipping Information
      </h4>
      <p class="text-sm text-gray-500">Enter your delivery address</p>
    </div>

    <!-- Card Content -->
    <div class="px-6 pb-6">
      <form class="space-y-4">
        <!-- Full Name -->
        <div>
          <label for="fullName" class="text-sm font-medium text-gray-700">Full Name</label>
          <input id="fullName" type="text" required
                 class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"/>
        </div>

        <!-- Address -->
        <div>
          <label for="address" class="text-sm font-medium text-gray-700">Address</label>
          <input id="address" type="text" required
                 class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"/>
        </div>

        <!-- City / State -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="city" class="text-sm font-medium text-gray-700">City</label>
            <input id="city" type="text" required
                   class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>
          <div>
            <label for="state" class="text-sm font-medium text-gray-700">State</label>
            <input id="state" type="text" required
                   class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>
        </div>

        <!-- ZIP / Phone -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="zipCode" class="text-sm font-medium text-gray-700">ZIP Code</label>
            <input id="zipCode" type="text" required
                   class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>
          <div>
            <label for="phone" class="text-sm font-medium text-gray-700">Phone</label>
            <input id="phone" type="tel" required
                   class="w-full h-9 rounded-md border border-gray-300 px-3 py-1 text-sm 
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit"
                class="w-full h-9 px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium 
                       hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
          Continue to Payment
        </button>
      </form>
    </div>
  </div>
</div>