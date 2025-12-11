// src/routes/seller/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { product, productImage, buyerOrder, orderItem } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || user.role !== 'seller') {
		throw redirect(302, '/login');
	}

	// Product List (for ManageProducts)
	const sellerProducts = await db
		.select()
		.from(product)
		.where(eq(product.sellerId, user.id))
		.orderBy(desc(product.createdAt));

	const formattedProducts = sellerProducts.map((p) => ({
		id: p.id,
		name: p.title,
		image: p.thumbnail,
		category: p.category,
		price: p.price,
		stock: p.stock,
		rating: p.rating ?? 0,
		reviewsCount: 0,
		description: p.description
	}));

	// Order List (for OrderStatus)
	const sellerOrders = await db
		.select({
			orderId: buyerOrder.id,
			orderDate: buyerOrder.createdAt,
			orderStatus: buyerOrder.orderStatus,
			fullName: buyerOrder.fullName,
			address: buyerOrder.address,
			city: buyerOrder.city,
			state: buyerOrder.state,
			zipCode: buyerOrder.zipCode,
			productId: product.id,
			productTitle: product.title,
			quantity: orderItem.quantity,
			price: orderItem.price
		})
		.from(buyerOrder)
		.innerJoin(orderItem, eq(buyerOrder.id, orderItem.orderId))
		.innerJoin(product, eq(orderItem.productId, product.id))
		.where(eq(product.sellerId, user.id))
		.orderBy(desc(buyerOrder.createdAt));

	const ordersMap = new Map<
		string,
		{
			id: string;
			date: Date;
			products: { name: string; quantity: number; price: number }[];
			total: number;
			status: string;
			shippingAddress: string;
			fullName: string;
		}
	>();

	for (const order of sellerOrders) {
		if (!ordersMap.has(order.orderId)) {
			ordersMap.set(order.orderId, {
				id: order.orderId,
				date: order.orderDate,
				products: [],
				total: 0,
				status: order.orderStatus,
				shippingAddress: `${order.address}, ${order.city}, ${order.state} ${order.zipCode}`,
				fullName: order.fullName
			});
		}
		const orderObj = ordersMap.get(order.orderId)!;
		orderObj.products.push({
			name: order.productTitle,
			quantity: order.quantity,
			price: order.price
		});
		orderObj.total += order.price * order.quantity;
	}

	const formattedOrders = Array.from(ordersMap.values());

	return {
		user,
		products: formattedProducts,
		orders: formattedOrders
	};
};

export const actions: Actions = {
	addProduct: async ({ request, locals }) => {
		const user = locals.user;
		if (!user || user.role !== 'seller') return { success: false };

		const data = await request.formData();
		const title = data.get('productName') as string;
		const category = data.get('category') as string;
		const price = parseFloat(data.get('price') as string);
		const stock = parseInt(data.get('stock') as string);
		const image = data.get('image') as string;

		try {
			const [newProduct] = await db
				.insert(product)
				.values({
					sellerId: user.id,
					title,
					description: ((data.get('description') as string) ?? '').toString(),
					category,
					price,
					stock,
					rating: 0,
					discountPercentage: 0,
					brand: 'Unknown',
					sku: `SKU-${Date.now()}`,
					weight: 1,
					warrantyInformation: 'No warranty',
					shippingInformation: 'Ships in 3-5 days',
					availabilityStatus: 'In Stock',
					returnPolicy: '30 days return',
					minimumOrderQuantity: 1,
					barcode: '000000000000',
					qrCode: 'https://example.com/qr',
					thumbnail: image
				})
				.returning();

			await db.insert(productImage).values({
				productId: newProduct.id,
				imageUrl: image
			});

			return { success: true, product: newProduct };
		} catch (e) {
			console.error(e);
			return { success: false, error: 'Failed to add product' };
		}
	},

	updateProduct: async ({ request, locals }) => {
		const user = locals.user;
		if (!user || user.role !== 'seller') {
			return { success: false };
		}

		const data = await request.formData();
		const id = parseInt(data.get('id') as string);
		const title = data.get('productName') as string;
		const category = data.get('category') as string;
		const price = parseFloat(data.get('price') as string);
		const stock = parseInt(data.get('stock') as string);
		const image = data.get('image') as string;

		try {
			await db
				.update(product)
				.set({
					title,
					category,
					price,
					stock,
					thumbnail: image,
					description: ((data.get('description') as string) ?? '').toString(),
					updatedAt: new Date()
				})
				.where(eq(product.id, id));

			const existingImage = await db
				.select()
				.from(productImage)
				.where(eq(productImage.productId, id))
				.limit(1);

			if (existingImage.length > 0) {
				await db
					.update(productImage)
					.set({ imageUrl: image })
					.where(eq(productImage.productId, id));
			} else {
				await db.insert(productImage).values({
					productId: id,
					imageUrl: image
				});
			}

			return { success: true };
		} catch (e) {
			console.error('Update error:', e);
			return { success: false, error: 'Update failed' };
		}
	},

	deleteProduct: async ({ request, locals }) => {
		const user = locals.user;
		console.log('[deleteProduct] user from locals =', user);

		if (!user || user.role !== 'seller') {
			console.warn('[deleteProduct] not authorized');
			return { success: false, error: 'Not authorized' };
		}

		const data = await request.formData();
		const idRaw = data.get('id');
		const idStr = idRaw != null ? idRaw.toString() : '';
		const id = Number(idStr);

		console.log('[deleteProduct] received id =', idStr, 'parsed =', id);

		if (!id || Number.isNaN(id)) {
			console.warn('[deleteProduct] invalid product id', idStr);
			return { success: false, error: 'Invalid product id' };
		}

		try {
			const [existing] = await db.select().from(product).where(eq(product.id, id));

			console.log('[deleteProduct] existing product =', existing);

			if (!existing) {
				return { success: false, error: 'Product not found' };
			}

			if (existing.sellerId !== user.id) {
				console.warn(
					'[deleteProduct] sellerId mismatch. product.sellerId =',
					existing.sellerId,
					'user.id =',
					user.id
				);
				return { success: false, error: 'You cannot delete this product' };
			}

			await db.delete(productImage).where(eq(productImage.productId, id));
			console.log('[deleteProduct] deleted images for product', id);

			await db.delete(product).where(eq(product.id, id));
			console.log('[deleteProduct] deleted product', id);

			return { success: true };
		} catch (e) {
			console.error('[deleteProduct] DB error', e);
			return { success: false, error: 'Delete failed' };
		}
	}
};
