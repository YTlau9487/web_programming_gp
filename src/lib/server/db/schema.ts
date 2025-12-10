import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { randomUUID } from 'crypto';

export const user = sqliteTable('user', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  email: text('email').notNull().unique(),
  username: text('username').notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull(),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey().$defaultFn(nanoid),
  userId: text('user_id').notNull().references(() => user.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const sellerProduct = sqliteTable('seller_product', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  sellerId: text('seller_id').notNull().references(() => user.id),
  productId: integer('product_id').notNull().references(() => product.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const buyerOrder = sqliteTable('buyer_order', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  buyerId: text('buyer_id').notNull().references(() => user.id),
  fullName: text('full_name').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zipCode: text('zip_code').notNull().default('0000'),
  phone: text('phone').notNull(),
  cardNumber: text('card_number').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const orderItem = sqliteTable('order_item', {
  id: text('id').primaryKey().$defaultFn(() => randomUUID()),
  orderId: text('order_id').notNull().references(() => buyerOrder.id),
  productId: integer('product_id').notNull().references(() => product.id),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
});

export const product = sqliteTable('product', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  price: real('price').notNull(),
  discountPercentage: real('discount_percentage').notNull(),
  rating: real('rating').notNull(),
  stock: integer('stock').notNull(),
  brand: text('brand').notNull(),
  sku: text('sku').notNull().unique(),
  weight: integer('weight').notNull(),
  warrantyInformation: text('warranty_information').notNull(),
  shippingInformation: text('shipping_information').notNull(),
  availabilityStatus: text('availability_status').notNull(),
  returnPolicy: text('return_policy').notNull(),
  minimumOrderQuantity: integer('minimum_order_quantity').notNull(),
  barcode: text('barcode').notNull(),
  qrCode: text('qr_code').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  thumbnail: text('thumbnail').notNull(),
});

export const productImage = sqliteTable('product_image', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => product.id),
  imageUrl: text('image_url').notNull(),
});

export const productDimensions = sqliteTable('product_dimensions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => product.id),
  width: real('width').notNull(),
  height: real('height').notNull(),
  depth: real('depth').notNull(),
});

export const productReview = sqliteTable('product_review', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => product.id),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  reviewerName: text('reviewer_name').notNull(),
  reviewerEmail: text('reviewer_email').notNull(),
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Product = typeof product.$inferSelect;
export type ProductImage = typeof productImage.$inferSelect;
export type ProductDimensions = typeof productDimensions.$inferSelect;
export type ProductReview = typeof productReview.$inferSelect;
export type SellerProduct = typeof sellerProduct.$inferSelect;
export type BuyerOrder = typeof buyerOrder.$inferSelect;
export type OrderItem = typeof orderItem.$inferSelect;