import { json } from '@sveltejs/kit';
import { getAllProducts } from '$lib/server/db/queries';

export async function GET() {
	try {
		const products = await getAllProducts();
		return json(products);
	} catch (error) {
		console.error('Error fetching products:', error);
		return json({ error: 'Failed to fetch products' }, { status: 500 });
	}
}
