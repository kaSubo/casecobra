import { Container } from '@/components/shared';
import { Separator } from '@/components/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface Props {
	className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<footer className={cn('bg-white h-20 relative', className)}>
			<Container>
				<Separator />
				<div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
					<div className='text-center md:text-left pb-2 md:pb-0'>
						<p className='text-sm text-muted-foreground'>
							&copy; {new Date().getFullYear()} All right reserved
						</p>
					</div>
					<div className='flex items-center justify-center'>
						<div className='flex space-x-8'>
							<Link
								className='text-sm text-muted-foreground hover:text-gray-600'
								href='#'>
								Terms
							</Link>
							<Link
								className='text-sm text-muted-foreground hover:text-gray-600'
								href='#'>
								Privacy Policy
							</Link>
							<Link
								className='text-sm text-muted-foreground hover:text-gray-600'
								href='#'>
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
};
