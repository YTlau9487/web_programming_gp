// src/routes/buyer/[id]/+page.ts
import type { PageLoad } from './$types';
import { getProductById } from '$lib/server/db/queries';

export const load: PageLoad = async ({ params }) => {
  const id = Number(params.id);
  const product = await getProductById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  return { product };
};
