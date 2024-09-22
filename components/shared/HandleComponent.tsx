import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

export const HandleComponent: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'size-4 rounded-full shadow border bg-white border-zink-200 transition hover:bg-primary',
				className
			)}
		/>
	);
};
