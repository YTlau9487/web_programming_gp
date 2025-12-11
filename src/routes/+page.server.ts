import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  // If not logged in, send user to the buyer landing page
  if (!user) {
    throw redirect(303, '/buyer');
  }

  // Logged-in buyer goes to buyer area
  if (user.role === 'buyer') {
    throw redirect(303, '/buyer');
  }

  // Logged-in seller goes to seller area
  if (user.role === 'seller') {
    throw redirect(303, '/seller');
  }

  // Fallback: return user data (in case of other roles)
  return { user };
};
