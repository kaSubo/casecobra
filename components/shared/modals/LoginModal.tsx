'use client';

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogDescription,
	buttonVariants,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import React from 'react';

interface Props {
	className?: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginModal: React.FC<Props> = ({ className, isOpen, setIsOpen }) => {
	return (
		<Dialog
			onOpenChange={setIsOpen}
			open={isOpen}>
			<DialogContent className={cn('z-[9999]', className)}>
				<DialogHeader>
					<div className='relative mx-auto size-28 mb-2'>
						<Image
							src='/snake-1.png'
							alt='Snake Image'
							className='object-contain'
							fill
						/>
					</div>
					<DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
						Log in to continue
					</DialogTitle>
					<DialogDescription className='text-base text-center py-2'>
						<span className='font-medium text-zinc-900'>
							Your configuration was saved!
						</span>{' '}
						Plase Log in or create an account to complete your purchase
					</DialogDescription>
				</DialogHeader>
				<div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
					<LoginLink className={buttonVariants({ variant: 'outline' })}>Login</LoginLink>
					<RegisterLink className={buttonVariants({ variant: 'default' })}>
						Sign up
					</RegisterLink>
				</div>
			</DialogContent>
		</Dialog>
	);
};
