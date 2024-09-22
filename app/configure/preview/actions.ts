'use server';

import { BASE_PRICE, PRODUCTS_PRICES } from '@/config/products';
import { stripe } from '@/lib/stripe';
import prisma from '@/prisma/prismaClient';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Order } from '@prisma/client';

export const createCheckoutSession = async ({ configId }: { configId: string }) => {
	const configuration = await prisma.configuration.findUnique({
		where: { id: configId },
	});

	if (!configuration) {
		throw new Error('[CREATE_CHECKOUT_SESSION] Configuration not found');
	}

	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		throw new Error('[CREATE_CHECKOUT_SESSION] You need to be logged in to proceed');
	}

	const { finish, material } = configuration;

	let price = BASE_PRICE;
	if (finish === 'textured') price += PRODUCTS_PRICES.finsh.textured;
	if (material === 'polycarbonate') price += PRODUCTS_PRICES.material.polycarbonate;

	let order: Order | undefined = undefined;

	const existingOrder = await prisma.order.findFirst({
		where: {
			userId: user.id,
			configurationId: configuration.id,
		},
	});

	if (existingOrder) {
		order = existingOrder;
	} else {
		order = await prisma.order.create({
			data: {
				amount: price / 100,
				userId: user.id,
				configurationId: configuration.id,
			},
		});
	}

	const product = await stripe.products.create({
		name: 'Custom iPhone Case',
		images: [configuration.imageUrl],
		default_price_data: {
			currency: 'usd',
			unit_amount: price,
		},
	});

	const stripeSession = await stripe.checkout.sessions.create({
		success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
		cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
		payment_method_types: ['card'],
		mode: 'payment',
		shipping_address_collection: {
			allowed_countries: ['RU', 'US'],
		},
		metadata: {
			userId: user.id,
			orderId: order.id,
		},
		line_items: [{ price: product.default_price as string, quantity: 1 }],
	});

	return { url: stripeSession.url };
};
