import type { PageServerLoad } from './$types';
import productsData from '$lib/data/products.json';

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user,               // from hooks.server.ts
    products: productsData.products
  };
};
