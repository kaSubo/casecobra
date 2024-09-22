import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	className?: string;
	children?: React.ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
	return (
		<div
			className={cn(
				'h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
				className
			)}>
			{children}
		</div>
	);
};
