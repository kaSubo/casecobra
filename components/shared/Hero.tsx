import { Container, Customers, Phone } from '@/components/shared';
import { BENEFITS1 } from '@/constants/constants';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props {
	className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {
	return (
		<section className={className}>
			<Container className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
				<div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
					<div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
						<div className='absolute w-28 left-0 -top-20 hidden lg:block'>
							<div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' />
							<Image
								src='/snake-1.png'
								alt='Snake Logo'
								width={112}
								height={146}
								className='w-full'
							/>
						</div>
						<h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
							Your Image on a <span className='bg-green-600 px-2 text-white'>Custom</span>{' '}
							Phone Case
						</h1>
						<p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
							Capture your favourite moments with your own,{' '}
							<span className='font-semibold'>one-of-one</span> phone case. Casecobra
							allows you to protect your memories, not just your phone.
						</p>
						<ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
							<div className='space-y-2'>
								{BENEFITS1.map((benefit, index) => (
									<li
										className='flex gap-1.5 items-center text-left'
										key={index}>
										<Check
											className='shrink-0 text-green-600'
											size={20}
										/>
										{benefit}
									</li>
								))}
							</div>
						</ul>

						<Customers />
					</div>
				</div>
				<div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
					<div className='relative md:max-w-xl'>
						<Image
							src='/your-image.png'
							alt='Your Phone Case'
							width={256}
							height={177}
							className='absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block'
						/>
						<Image
							src='/line.png'
							alt='Separator'
							width={96}
							height={172}
							className='absolute w-20 -left-6 -bottom-6 select-none'
						/>
						<Phone
							className='w-64'
							imageUrl='/testimonials/1.jpg'
						/>
					</div>
				</div>
			</Container>
		</section>
	);
};
