import { DesignConfigurator } from '@/components/shared';
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

	const { imageUrl, width, height } = configuration;

	return (
		<DesignConfigurator
			configId={configuration.id}
			imageUrl={imageUrl}
			imageDimensions={{ width, height }}
		/>
	);
}
