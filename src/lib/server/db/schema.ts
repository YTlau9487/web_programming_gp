import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { randomUUID } from 'crypto';

export const user = sqliteTable('user', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  email: text('email').notNull().unique(),
  username: text('username').notNull(),
  passwordHash: text('password_hash').notNull(), // store Argon2 password hash
  role: text('role').notNull(), // user role: buyer / seller
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey().$defaultFn(nanoid),
  userId: text('user_id').notNull().references(() => user.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
