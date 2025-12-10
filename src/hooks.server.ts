import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
// import { seedProducts, seedUsers, seedSellerProducts } from '$lib/server/db/seed';
import { seedProducts, seedUsers } from '$lib/server/db/seed';

const handleAuth: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(auth.sessionCookieName);
  console.log('sessionToken =', sessionToken); // Check the token stored in the cookie

  if (!sessionToken) {
    console.log('No sessionToken → treat as logged out');
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await auth.validateSessionToken(sessionToken);
  console.log('validate result:', { session, user }); // Check the validation result

  if (session) {
    console.log('Session is valid, refreshing cookie. ExpiresAt =', session.expiresAt);
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    console.log('Session is invalid, deleting cookie');
    auth.deleteSessionTokenCookie(event);
  }

  event.locals.user = user;
  event.locals.session = session;
  console.log('locals after auth:', event.locals); // Inspect locals after authentication

  return resolve(event);
};

// Run seeds on startup (only once)
let seedRun = false;
if (!seedRun) {
	seedRun = true;
	(async () => {
		try {
			await seedUsers();
			await seedProducts();
		} catch (error) {
			console.error('Error during seeding:', error);
		}
	})();
}

export const handle: Handle = handleAuth;
