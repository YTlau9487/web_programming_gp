import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = locals.user;

  // Not logged in or no user found
  if (!user) {
    throw error(401, 'Unauthorized');
  }

  // Logged in but not a seller
  if (user.role !== 'seller') {
    throw error(401, 'Only sellers can access this page');
  }

  // Passed the check – make user available to child pages
  return { user };
};
