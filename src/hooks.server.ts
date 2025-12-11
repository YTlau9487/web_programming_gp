import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import {
  seedProducts,
  seedUsers,
  seedOrders,
  seedSellerOrders
} from '$lib/server/db/seed';

// Authentication handle: attach user/session to event.locals based on cookie
const handleAuth: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(auth.sessionCookieName);
  console.log('sessionToken =', sessionToken); // Check the token stored in the cookie

  // No session cookie found → treat request as logged out
  if (!sessionToken) {
    console.log('No sessionToken → treat as logged out');
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  // Validate session token against the database
  const { session, user } = await auth.validateSessionToken(sessionToken);
  console.log('validate result:', { session, user }); // Check the validation result

  if (session) {
    // Session still valid → refresh cookie expiry to keep user logged in
    console.log(
      'Session is valid, refreshing cookie. ExpiresAt =',
      session.expiresAt
    );
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    // Session invalid/expired → remove cookie from browser
    console.log('Session is invalid, deleting cookie');
    auth.deleteSessionTokenCookie(event);
  }

  // Make authenticated user and session available to all server load functions
  event.locals.user = user;
  event.locals.session = session;
  console.log('locals after auth:', event.locals); // Inspect locals after authentication

  return resolve(event);
};

// Run seed on startup (only once)
// This seeds demo users, products, and orders into the database
let seedRun = false;
if (!seedRun) {
  seedRun = true;
  console.log('Starting database seeding...');

  seedUsers()
    .then(() => {
      console.log('Users seeded, starting products...');
      return seedProducts();
    })
    .then(() => {
      console.log('Products seeded, starting orders...');
      return seedOrders();
    })
    .then(() => {
      console.log('Orders seeded, starting alice_seller orders...');
      return seedSellerOrders();
    })
    .then(() => {
      console.log('All seeding completed!');
    })
    .catch((error) => {
      console.error('Seeding error:', error);
    });
}

// Register handleAuth as the global handle for all requests
export const handle: Handle = handleAuth;
