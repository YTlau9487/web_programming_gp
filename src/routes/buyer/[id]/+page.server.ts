import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { getProductById } from '$lib/server/db/queries';
import { db } from '$lib/server/db';
import {
  buyerOrder,
  orderItem,
  productReview,
  user
} from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, locals }) => {
  const productId = Number(params.id);

  // Redirect if product id is invalid
  if (Number.isNaN(productId)) {
    throw redirect(302, '/buyer');
  }

  // Fetch product details from DB
  const productData = await getProductById(productId);

  // Redirect if product does not exist
  if (!productData) {
    throw redirect(302, '/buyer');
  }

  let hasPurchased = false;

  // If logged-in buyer, check if they have ever purchased this product
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

  // Provide product, user info and purchase flag to the page
  return {
    product: productData,
    user: locals.user,
    hasPurchased
  };
};

export const actions: Actions = {
  addComment: async ({ request, params, locals }) => {
    // Only logged-in buyers are allowed to add reviews
    if (!locals.user || locals.user.role !== 'buyer') {
      return { success: false, error: 'Not authorized' };
    }

    const productId = Number(params.id);
    const form = await request.formData();
    const ratingStr = form.get('rating')?.toString() ?? '';
    const comment = (form.get('comment')?.toString() ?? '').trim();

    const rating = Number(ratingStr);

    // Basic validation for rating and comment
    if (!comment || !rating || rating < 1 || rating > 5) {
      return { success: false, error: 'Invalid input' };
    }

    try {
      // Ensure this buyer has purchased this product before reviewing
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
        return {
          success: false,
          error: 'You have not purchased this product'
        };
      }

      // Fetch full user record to get username and email
      const [fullUser] = await db
        .select()
        .from(user)
        .where(eq(user.id, locals.user.id));

      if (!fullUser) {
        return { success: false, error: 'User not found' };
      }

      // Insert new product review into product_review table
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
      // Generic error response for unexpected failures
      return { success: false, error: 'Failed to add comment' };
    }
  }
};
