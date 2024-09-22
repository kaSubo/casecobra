import React from 'react';
import { Rating } from '@/components/shared';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
	text: React.ReactNode;
	name: string;
	imageUrl: string;
	className?: string;
}

export const Review: React.FC<Props> = ({
	className,
	text,
	name,
	imageUrl,
}) => {
	return (
		<div className={cn('mx-auto max-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16', className)}>
			<div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
				<Rating className='mb-2' />
				<div className='text-lg leading-8'>{text}</div>
				<div className='flex gap-4 mt-2'>
					<Image
						src={imageUrl}
						alt='user image'
						width={48}
						height={48}
						className='rounded-full object-cover'
					/>
					<div className='flex flex-col'>
						<p className='font-semibold'>{name}</p>
						<div className='flex gap-1.5 items-center text-zinc-600'>
							<Check
								className='stroke-[3px] text-gray-600'
								size={16}
							/>
							<p className='text-sm'>Verified purchase</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
