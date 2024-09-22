import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import React from 'react';

interface Props {
	count?: number;
	className?: string;
}

export const Rating: React.FC<Props> = ({ className, count = 5 }) => {
	return (
		<div className={cn('flex gap-0.5', className)}>
			{[...Array(count)].map((_, i) => (
				<Star
					key={i}
					className='text-green-600 fill-green-600'
					size={20}
				/>
			))}
		</div>
	);
};
