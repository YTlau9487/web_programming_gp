import type { PageServerLoad } from './$types';
import { getAllProducts } from '$lib/server/db/queries';

export const load: PageServerLoad = async ({ locals }) => {
  const products = await getAllProducts();
  
  return {
    user: locals.user,               // from hooks.server.ts
    products
  };
};
