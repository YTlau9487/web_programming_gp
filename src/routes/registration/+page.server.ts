// Not the real implement of the registration system

import { redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ request }) => {
		console.log('Performing registration...');
		const formData = await request.formData();
		console.log(formData);
		redirect(303,'/login');
	}
};
