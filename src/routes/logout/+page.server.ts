import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { deleteSessionTokenCookie, invalidateSession, sessionCookieName } from '$lib/server/auth';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

export const actions: Actions = {
  default: async (event) => {
    const token = event.cookies.get(sessionCookieName);
    if (token) {
      // Convert token to session id (same as in validateSessionToken)
      const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
      await invalidateSession(sessionId);
      deleteSessionTokenCookie(event);
    }

    throw redirect(303, '/login');
  }
};
