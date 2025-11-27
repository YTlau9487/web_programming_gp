// Not the real implement of the login system

import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request }) => {
		console.log('Performing log in...');
		const formData = await request.formData();
		console.log(formData);
    redirect(303, '/test');
	}
};