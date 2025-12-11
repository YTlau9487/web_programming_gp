// src/routes/buyer/[id]/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { getProductById } from '$lib/server/db/queries';
import { db } from '$lib/server/db';
import { buyerOrder, orderItem, productReview, user } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const productId = Number(params.id);

  if (Number.isNaN(productId)) {
    throw redirect(302, '/buyer');
  }

  const productData = await getProductById(productId);

  if (!productData) {
    throw redirect(302, '/buyer');
  }

  let hasPurchased = false;

  if (locals.user && locals.user.role === 'buyer') {
    const purchase = await db
      .select()
      .from(buyerOrder)
      .innerJoin(orderItem, eq(buyerOrder.id, orderItem.orderId))
      .where(
        and(
          eq(buyerOrder.buyerId, locals.user.id),
          eq(orderItem.productId, productId)
        )
      )
      .limit(1);

    hasPurchased = purchase.length > 0;
  }

  return {
    product: productData,
    user: locals.user,
    hasPurchased
  };
};

export const actions: Actions = {
  addComment: async ({ request, params, locals }) => {
    // 必須是已登入 buyer
    if (!locals.user || locals.user.role !== 'buyer') {
      return { success: false, error: 'Not authorized' };
    }

    const productId = Number(params.id);
    const form = await request.formData();
    const ratingStr = form.get('rating')?.toString() ?? '';
    const comment = (form.get('comment')?.toString() ?? '').trim();

    const rating = Number(ratingStr);

    // 基本驗證
    if (!comment || !rating || rating < 1 || rating > 5) {
      return { success: false, error: 'Invalid input' };
    }

    try {
      // 確認這個 buyer 有買過這個 product
      const purchase = await db
        .select()
        .from(buyerOrder)
        .innerJoin(orderItem, eq(buyerOrder.id, orderItem.orderId))
        .where(
          and(
            eq(buyerOrder.buyerId, locals.user.id),
            eq(orderItem.productId, productId)
          )
        )
        .limit(1);

      if (purchase.length === 0) {
        return { success: false, error: 'You have not purchased this product' };
      }

      // 查出完整 user（拿 email）
      const [fullUser] = await db
        .select()
        .from(user)
        .where(eq(user.id, locals.user.id));

      if (!fullUser) {
        return { success: false, error: 'User not found' };
      }

      // 寫入 product_review
      await db.insert(productReview).values({
        productId,
        rating,
        comment,
        date: new Date(),
        reviewerName: fullUser.username,
        reviewerEmail: fullUser.email
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding comment:', error);
      return { success: false, error: 'Failed to add comment' };
    }
  }
};
