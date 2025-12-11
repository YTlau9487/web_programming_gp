import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = locals.user;

  // Not logged in or no user found
  if (!user) {
    throw redirect(307, '/login');
  }

  // Logged in but not a seller
  if (user.role !== 'seller') {
    throw redirect(307, '/buyer');
  }

  // Passed the check – make user available to child pages
  return { user };
};
