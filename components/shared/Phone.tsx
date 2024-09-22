import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
	imageUrl: string;
	dark?: boolean;
}

export const Phone: React.FC<Props> = ({
	imageUrl,
	dark = false,
	className,
	...props
}) => {
	return (
		<div
			className={cn('relative pointer-events-none z-50 overflow-hidden', className)}
			{...props}>
			<Image
				src={dark ? '/phone-template-dark-edges.png' : '/phone-template-white-edges.png'}
				alt='Phone image'
				width={256}
				height={533}
				className='pointer-events-none z-50 select-none'
			/>
			<div className='absolute -z-10 inset-0'>
				<Image
					src={imageUrl}
					alt='overlaying phone image'
					fill
					className='object-cover min-w-full min-h-full'
				/>
			</div>
		</div>
	);
};
