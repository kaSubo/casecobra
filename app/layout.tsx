import { Footer, NavBar, Providers } from '@/components/shared';
import { Toaster } from '@/components/ui/';
import { cn, constructMetadata } from '@/lib/utils';
import { Recursive } from 'next/font/google';
import './globals.css';

const recursive = Recursive({
	subsets: ['latin'],
	display: 'swap',
	fallback: ['system-ui', 'arial'],
});

export const metadata = constructMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={cn('bg-white text-black', recursive.className)}>
				<NavBar />
				<main className='flex flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light'>
					<div className='flex flex-1 flex-col h-full'>
						<Providers>{children}</Providers>
					</div>
					<Footer />
				</main>
				<Toaster />
			</body>
		</html>
	);
}
