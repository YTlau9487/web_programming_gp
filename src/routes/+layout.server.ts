import type { LayoutServerLoad, LayoutServerData } from './$types';

// Root layout load: make the authenticated user available to all pages
export const load: LayoutServerLoad = async ({ locals }) => {
	// Expose locals.user (set in hooks) to the client as layout data
	return {
		user: locals.user
	} satisfies LayoutServerData;
};
