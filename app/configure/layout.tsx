import { Container, Steps } from '@/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'CaseCobra | Configure',
	description: 'Configure your image on a custom phone case',
};

export default function ConfigureLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Container className='flex-1 flex flex-col'>
			<Steps />
			{children}
		</Container>
	);
}
