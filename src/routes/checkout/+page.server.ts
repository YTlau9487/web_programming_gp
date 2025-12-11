import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createOrder } from '$lib/server/db/queries';

export const actions: Actions = {
  placeOrder: async ({ request, locals }) => {
    const user = locals.user;

    console.log('[placeOrder] user from locals=', user);

    // Ensure the user is logged in before placing an order
    if (!user) {
      console.warn('[placeOrder] unauthorized - no user in locals');
      return fail(401, { message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const shippingInfo = {
      fullName: formData.get('fullName') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string,
      phone: formData.get('phone') as string
    };

    const paymentInfo = {
      cardNumber: formData.get('cardNumber') as string
    };

    const cartItemsJson = formData.get('cartItems') as string;
    let cartItems = [] as any[];
    try {
      cartItems = JSON.parse(cartItemsJson || '[]');
    } catch (err) {
      console.error(
        '[placeOrder] failed parsing cartItems',
        cartItemsJson,
        err
      );
      // Reject if cart data is malformed JSON
      return fail(400, { message: 'Invalid cart data' });
    }

    console.log(
      '[placeOrder] shippingInfo=',
      shippingInfo,
      'paymentInfo=',
      paymentInfo,
      'cartItemsCount=',
      cartItems.length
    );

    // Validate required fields before creating an order
    if (
      !shippingInfo.fullName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.phone ||
      !paymentInfo.cardNumber
    ) {
      return fail(400, { message: 'Missing required fields' });
    }

    // Ensure there is at least one item in the cart
    if (!cartItems || cartItems.length === 0) {
      return fail(400, { message: 'Cart is empty' });
    }

    try {
      // Create order in the database from user, shipping, payment and cart data
      const result = await createOrder({
        buyerId: user.id,
        fullName: shippingInfo.fullName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        phone: shippingInfo.phone,
        cardNumber: paymentInfo.cardNumber,
        items: cartItems.map((item: any) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      });

      console.log('[placeOrder] order created result=', result);
      // Let the client know the order was created successfully
      return { success: true };
    } catch (error) {
      console.error(
        '[placeOrder] Error creating order:',
        (error as any)?.stack ?? error
      );
      // Handle unexpected server / database errors
      return fail(500, {
        message: 'Failed to create order',
        detail: String((error as any) ?? '')
      });
    }
  }
};
