import { Container, Steps } from '@/components/shared';

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
