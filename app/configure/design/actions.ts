'use server';

import prisma from '@/prisma/prismaClient';
import type { SaveConfigArgs } from '@/types';


export async function saveConfig({
	color,
	finish,
	material,
	model,
	configId,
}: SaveConfigArgs) {
	await prisma.configuration.update({
		where: { id: configId },
		data: { color, finish, material, model },
	});
}
