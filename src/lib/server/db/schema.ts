import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const user = sqliteTable('user', {
	id: text('id').primaryKey().$defaultFn(crypto.randomUUID),
	username: text().notNull(),
	age: integer('age')
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey().$defaultFn(nanoid),
	userId: text('user_id').notNull().references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
