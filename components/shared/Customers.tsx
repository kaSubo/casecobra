import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Rating } from '@/components/shared';

interface Props {
	className?: string;
}

export const Customers: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'mt-12 flex flex-col md:flex-row items-center gap-5',
				className
			)}>
			<div className='flex -space-x-4'>
				<Image
					src='/users/user-1.png'
					alt='user image'
					width={40}
					height={40}
					className='inline-block rounded-full ring-2 ring-slate-100'
				/>
				<Image
					src='/users/user-2.png'
					alt='user image'
					width={40}
					height={40}
					className='inline-block rounded-full ring-2 ring-slate-100'
				/>
				<Image
					src='/users/user-3.png'
					alt='user image'
					width={40}
					height={40}
					className='inline-block rounded-full ring-2 ring-slate-100'
				/>
				<Image
					src='/users/user-4.jpg'
					alt='user image'
					width={40}
					height={40}
					className='inline-block rounded-full ring-2 ring-slate-100'
				/>
				<Image
					src='/users/user-5.jpg'
					alt='user image'
					width={40}
					height={40}
					className='inline-block object-cover rounded-full ring-2 ring-slate-100'
				/>
			</div>
			<div className='flex flex-col justify-between items-center md:items-start'>
				<Rating />
				<p>
					<span className='font-semibold'>1.250</span> happy customers
				</p>
			</div>
		</div>
	);
};
