import { ThankYou } from '@/components/shared';
import { Suspense } from 'react';

export default function Page({
	searchParams: { orderId },
}: {
	searchParams: { orderId: string };
}) {
	return (
		<Suspense>
			<ThankYou orderId={orderId || ''} />
		</Suspense>
	);
}
