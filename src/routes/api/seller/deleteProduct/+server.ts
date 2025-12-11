// src/routes/api/seller/deleteProduct/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import {
	product,
	productImage,
	productDimensions,
	productReview,
	orderItem
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;

	// 必須是已登入的 seller
	if (!user || user.role !== 'seller') {
		return new Response(JSON.stringify({ success: false, error: 'Not authorized' }), {
			status: 401
		});
	}

	const form = await request.formData();
	const idStr = form.get('id')?.toString() ?? '';
	const id = Number(idStr);

	if (!id || Number.isNaN(id)) {
		return new Response(JSON.stringify({ success: false, error: 'Invalid product id' }), {
			status: 400
		});
	}

	try {
		// 先確認這個 product 存在，且是這個 seller 的
		const [existing] = await db.select().from(product).where(eq(product.id, id));

		if (!existing) {
			return new Response(JSON.stringify({ success: false, error: 'Product not found' }), {
				status: 404
			});
		}

		if (existing.sellerId !== user.id) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'You cannot delete this product'
				}),
				{ status: 403 }
			);
		}

		// 1) 刪所有評論
		await db.delete(productReview).where(eq(productReview.productId, id));

		// 2) 刪所有與此商品相關的訂單項目
		await db.delete(orderItem).where(eq(orderItem.productId, id));

		// 3) 刪圖片
		await db.delete(productImage).where(eq(productImage.productId, id));

		// 4) 刪商品尺寸資料
		await db.delete(productDimensions).where(eq(productDimensions.productId, id));

		// 5) 最後刪商品本身
		await db.delete(product).where(eq(product.id, id));

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		console.error('[api/seller/deleteProduct] DB error', err);
		return new Response(JSON.stringify({ success: false, error: 'Delete failed' }), {
			status: 500
		});
	}
};
