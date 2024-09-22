import { DesignPreview } from '@/components/shared';
import prisma from '@/prisma/prismaClient';
import type { PageProps } from '@/types';
import { notFound } from 'next/navigation';

export default async function Page({ searchParams: { id } }: PageProps) {
	if (!id || typeof id !== 'string') {
		return notFound();
	}

	const configuration = await prisma.configuration.findUnique({
		where: { id },
	});

	if (!configuration) {
		return notFound();
	}

  return <DesignPreview configuration={configuration} />
}
