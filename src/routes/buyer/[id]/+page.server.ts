// src/routes/buyer/[id]/+page.ts
import type { PageLoad } from './$types';
import data from '$lib/data/products.json';
import { getProductById } from '$lib/server/db/queries';
import { db } from '$lib/server/db';
import { buyerOrder, orderItem, product, productReview } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, locals }) => {
  const productId = parseInt(params.id);

  if (isNaN(productId)) {
    throw redirect(302, '/buyer');
  }

  const productData = await getProductById(productId);

  if (!productData) {
    throw redirect(302, '/buyer');
  }

  // Check if user is logged in and is a buyer
  let hasPurchased = false;
  if (locals.user && locals.user.role === 'buyer') {
    // Check if this buyer has purchased this product
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

export const actions = {
  addComment: async ({ request, params, locals }) => {
    // Check if user is logged in
    if (!locals.user || locals.user.role !== 'buyer') {
      return { success: false, error: 'Not authorized' };
    }

    const productId = parseInt(params.id);
    const body = await request.json();
    const { rating, comment } = body;

    // Validate input
    if (!comment || !rating || rating < 1 || rating > 5) {
      return { success: false, error: 'Invalid input' };
    }

    try {
      // Verify buyer has actually purchased this product
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

      // Insert review
      await db.insert(productReview).values({
        productId,
        rating,
        comment: comment.trim(),
        date: new Date(),
        reviewerName: locals.user.username,
        reviewerEmail: 'buyer@example.com' // You might want to store email in user table
      });

      return { success: true };
    } catch (error) {
      console.error('Error adding comment:', error);
      return { success: false, error: 'Failed to add comment' };
    }
  }
};
