'use server';

import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from '@/components/shared';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

interface Props {
	className?: string;
}

export const NavBar: React.FC<Props> = async ({ className }) => {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const isAdmin = user?.email === process.env.ADMIN_EMAIL;  

	return (
		<nav
			className={cn(
				'sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all',
				className
			)}>
			<Container>
				<div className='flex h-14 items-center justify-between border-b border-zinc-200'>
					<Link
						href='/'
						className='flex z-40 font-semibold'>
						case<span className='text-green-600'>cobra</span>
					</Link>
					<div className='h-full flex items-center space-x-4'>
						{user ? (
							<>
								<Link
									href='/api/auth/logout'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									Sign Out
								</Link>
								{isAdmin ? (
									<Link
										href='/api/auth/logout'
										className={buttonVariants({
											size: 'sm',
											variant: 'ghost',
										})}>
										Dashboard ✨
									</Link>
								) : null}
								<Link
									href='/configure/upload'
									className={buttonVariants({
										size: 'sm',
										className: 'hidden sm:flex items-center gap-1',
									})}>
									Create case
									<ArrowRight
										className='ml-1.5'
										size={25}
									/>
								</Link>
							</>
						) : (
							<>
								<Link
									href='/api/auth/register'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									Sign up
								</Link>
								<Link
									href='/api/auth/login'
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									Login
								</Link>
								<div className='h-8 w-px bg-zinc-200 hidden sm:block' />
								<Link
									href='/configure/upload'
									className={buttonVariants({
										size: 'sm',
										className: 'hidden sm:flex items-center gap-1',
									})}>
									Create case
									<ArrowRight
										className='ml-1.5'
										size={25}
									/>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</nav>
	);
};
