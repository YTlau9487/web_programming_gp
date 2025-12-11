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

  // Only authenticated sellers are allowed to delete products
  if (!user || user.role !== 'seller') {
    return new Response(
      JSON.stringify({ success: false, error: 'Not authorized' }),
      {
        status: 401
      }
    );
  }

  const form = await request.formData();
  const idStr = form.get('id')?.toString() ?? '';
  const id = Number(idStr);

  // Validate product id from the request
  if (!id || Number.isNaN(id)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid product id' }),
      {
        status: 400
      }
    );
  }

  try {
    // First, check that the product exists and belongs to this seller
    const [existing] = await db
      .select()
      .from(product)
      .where(eq(product.id, id));

    if (!existing) {
      return new Response(
        JSON.stringify({ success: false, error: 'Product not found' }),
        {
          status: 404
        }
      );
    }

    // Prevent sellers from deleting products they do not own
    if (existing.sellerId !== user.id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'You cannot delete this product'
        }),
        { status: 403 }
      );
    }

    // 1) Remove all reviews linked to this product
    await db.delete(productReview).where(eq(productReview.productId, id));

    // 2) Remove all order items that reference this product
    await db.delete(orderItem).where(eq(orderItem.productId, id));

    // 3) Remove all product images for this product
    await db.delete(productImage).where(eq(productImage.productId, id));

    // 4) Remove product dimension records for this product
    await db
      .delete(productDimensions)
      .where(eq(productDimensions.productId, id));

    // 5) Finally, delete the product record itself
    await db.delete(product).where(eq(product.id, id));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('[api/seller/deleteProduct] DB error', err);
    // Generic server error if anything goes wrong during deletion
    return new Response(
      JSON.stringify({ success: false, error: 'Delete failed' }),
      {
        status: 500
      }
    );
  }
};
