import { db } from './index';
import { product, productImage, productDimensions, productReview, user, sellerProduct } from './schema';
import productsData from '$lib/data/products.json';
import { eq } from 'drizzle-orm';
import { hash } from 'argon2';

export async function seedUsers() {
	try {
		const existingUsers = await db.select().from(user).limit(1);
		if (existingUsers.length > 0) {
			console.log('Users already seeded, skipping...');
			return;
		}

		console.log('Starting user seed...');

		const dummyUsers = [
			{
				email: 'buyer1@example.com',
				username: 'buyer_john',
				passwordHash: 'password123',
				role: 'buyer'
			},
			{
				email: 'buyer2@example.com',
				username: 'buyer_jane',
				passwordHash: 'password123',
				role: 'buyer'
			},
			{
				email: 'seller1@example.com',
				username: 'seller_mike',
				passwordHash: 'password123',
				role: 'seller'
			},
			{
				email: 'seller2@example.com',
				username: 'seller_sarah',
				passwordHash: 'password123',
				role: 'seller'
			},
			{
				email: 'buyer3@example.com',
				username: 'buyer_alex',
				passwordHash: 'password123',
				role: 'buyer'
			}
		];

		for (const u of dummyUsers) {
			const passwordHash = await hash(u.passwordHash);
			await db.insert(user).values({
				email: u.email,
				username: u.username,
				passwordHash,
				role: u.role
			});
		}

		console.log('User seed completed successfully!');
	} catch (error) {
		console.error('Error seeding users:', error);
	}
}

export async function seedProducts() {
	try {
		const existingProducts = await db.select().from(product).limit(1);
		if (existingProducts.length > 0) {
			console.log('Products already seeded, skipping...');
			return;
		}

		console.log('Starting product seed...');

		// Get all sellers
		const sellers = await db.select().from(user).where(eq(user.role, 'seller'));

		if (sellers.length === 0) {
			console.log('No sellers found, skipping product seed');
			return;
		}

		for (const p of productsData.products) {
			// Randomly assign a seller to this product
			const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];

			await db.insert(product).values({
				id: p.id,
				sellerId: randomSeller.id,
				title: p.title,
				description: p.description,
				category: p.category,
				price: p.price,
				discountPercentage: p.discountPercentage,
				rating: p.rating,
				stock: p.stock,
				brand: p.brand ?? 'unknown',
				sku: p.sku,
				weight: p.weight,
				warrantyInformation: p.warrantyInformation,
				shippingInformation: p.shippingInformation,
				availabilityStatus: p.availabilityStatus,
				returnPolicy: p.returnPolicy,
				minimumOrderQuantity: p.minimumOrderQuantity,
				barcode: p.meta.barcode,
				qrCode: p.meta.qrCode,
				createdAt: new Date(p.meta.createdAt),
				updatedAt: new Date(p.meta.updatedAt),
				thumbnail: p.thumbnail
			});

			for (const imageUrl of p.images) {
				await db.insert(productImage).values({
					productId: p.id,
					imageUrl
				});
			}

			await db.insert(productDimensions).values({
				productId: p.id,
				width: p.dimensions.width,
				height: p.dimensions.height,
				depth: p.dimensions.depth
			});

			for (const review of p.reviews) {
				await db.insert(productReview).values({
					productId: p.id,
					rating: review.rating,
					comment: review.comment,
					date: new Date(review.date),
					reviewerName: review.reviewerName,
					reviewerEmail: review.reviewerEmail
				});
			}
		}

		console.log('Product seed completed successfully!');
	} catch (error) {
		console.error('Error seeding products:', error);
	}
}
