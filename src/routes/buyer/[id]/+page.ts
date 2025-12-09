// src/routes/buyer/[id]/+page.ts
import type { PageLoad } from './$types';
import data from '$lib/data/products.json';

export const load: PageLoad = ({ params }) => {
  const id = Number(params.id);
  const product = data.products.find((p) => p.id === id);

  if (!product) {
    throw new Error('Product not found');
  }

  return { product };
};
