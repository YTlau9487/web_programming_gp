// auto redirect to the login page cuz I'm lazy to type the route

import { redirect } from '@sveltejs/kit';
export const load = () => {
	throw redirect(307, '/login');
};