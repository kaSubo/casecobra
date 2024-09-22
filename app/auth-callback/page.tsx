'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAuthStatus } from './actions';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Page() {
	const [configId, setConfigId] = React.useState<string | null>(null);
	const { push } = useRouter();

	React.useEffect(() => {
		const configurationId = localStorage.getItem('configurationId');
		if (configurationId) setConfigId(configurationId);
	}, []);

	const { data } = useQuery({
		queryKey: ['auth-callback'],
		queryFn: async () => await getAuthStatus(),
		retry: true,
		retryDelay: 5000,
	});

	if (data?.success) {
		if (configId) {
			localStorage.removeItem('configurationId');
			push(`/configure/preview/?id=${configId}`);
		} else {
			push('/');
		}
	}

	return (
		<div className='w-full mt-28 flex justify-center'>
			<div className='flex flex-col items-center gap-2'>
				<Loader2
					size={32}
					className='animate-spin text-zinc-500'
				/>
				<h3 className='font-semibold text-xl'>Logging you in...</h3>
				<p>You will be redirected automatically.</p>
			</div>
		</div>
	);
}
