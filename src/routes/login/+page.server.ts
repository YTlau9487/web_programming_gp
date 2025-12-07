import type { Actions } from './$types';
import { db } from '$lib/server/db';
import argon2 from 'argon2';
import { fail, redirect } from '@sveltejs/kit';
import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '').trim();

		// Basic validation
		if (!email || !password) {
			return fail(400, {
				success: false,
				error: 'Email and password are required.'
			});
		}

		// 1. Find user by email
		const existing = await db.query.user.findFirst({
			where: (u, { eq }) => eq(u.email, email)
		});

		if (!existing) {
			return fail(400, {
				success: false,
				error: 'Invalid email or password.'
			});
		}

		// 2. Verify password using Argon2
		const ok = await argon2.verify(existing.passwordHash, password);

		if (!ok) {
			return fail(400, {
				success: false,
				error: 'Invalid email or password.'
			});
		}

		// 3. Generate a random session token (this plain token will be stored in the cookie)
		const token = generateSessionToken();

		// 4. Create session in DB (DB stores only the SHA-256 hash of the token)
		const session = await createSession(token, existing.id);

		// 5. Set cookie with the plain token so future requests can be authenticated
		setSessionTokenCookie(event, token, session.expiresAt);

		// 6. Redirect after successful login
		throw redirect(303, '/');
	}
};
