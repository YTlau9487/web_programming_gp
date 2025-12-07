import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import argon2 from 'argon2';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
  // Handle POST /registration? /register (form action)
  register: async ({ request }) => {
    // Read form data from the incoming request
    const formData = await request.formData();

    // Extract and normalize fields from the form
    const username = String(formData.get('username') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();
    const role = String(formData.get('roles') ?? '').trim();

    // Basic required-field validation
    if (!username || !email || !password || !role) {
      return fail(400, {
        success: false,
        error: 'All fields are required.',
        username,
        email,
        role
      });
    }

    // Only allow valid roles
    if (role !== 'buyer' && role !== 'seller') {
      return fail(400, {
        success: false,
        error: 'Invalid role.',
        username,
        email,
        role
      });
    }

    // Check if email is already registered
    const existing = await db.query.user.findFirst({
      where: (u, { eq }) => eq(u.email, email)
    });

    if (existing) {
      return fail(400, {
        success: false,
        error: 'Email is already registered.',
        username,
        email,
        role
      });
    }

    // Hash the password using Argon2 before storing
    const passwordHash = await argon2.hash(password);

    // Insert new user record into the database
    await db.insert(user).values({
      email,
      username,
      passwordHash,
      role
    });

    // Indicate success to the client (can be used in +page.svelte as `form`)
    return {
      success: true
    };
  }
};
