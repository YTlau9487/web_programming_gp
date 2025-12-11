import { json } from '@sveltejs/kit';
import { getAllProducts } from '$lib/server/db/queries';

export async function GET() {
	try {
		// Fetch all products from the database for public API use
		const products = await getAllProducts();
		// Return the list of products as JSON
		return json(products);
	} catch (error) {
		console.error('Error fetching products:', error);
		// Return a 500 error response if the query fails
		return json({ error: 'Failed to fetch products' }, { status: 500 });
	}
}
