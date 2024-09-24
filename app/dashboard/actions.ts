'use server';

import prisma from '@/prisma/prismaClient';
import { OrderStatus } from '@prisma/client';

interface ChangeOrderStatusArgs {
	id: string;
	newStatus: OrderStatus;
}

export const changeOrderStatus = async ({ id, newStatus }: ChangeOrderStatusArgs) => {
	await prisma.order.update({
		where: { id },
		data: {
			status: newStatus,
		},
	});
};
