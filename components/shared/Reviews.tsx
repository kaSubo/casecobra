import { AnimatedReviews, Container } from '@/components/shared';
import { Icons } from '@/components/ui';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Review } from '@/components/shared';

interface Props {
	className?: string;
}

export const Reviews: React.FC<Props> = ({ className }) => {
	return (
		<section className={cn('bg-slate-100 py-24', className)}>
			<Container className='flex flex-col items-center gap-16 sm:gap-32'>
				<div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
					<h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
						What our{' '}
						<span className='relative px-2'>
							customers{' '}
							<Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-600' />
						</span>{' '}
						say
					</h2>
					<Image
						src='/snake-2.png'
						alt='Snake image'
						className='w-28 order-0 lg:order-2'
						width={112}
						height={100}
					/>
				</div>
				<Review
					text={
						<p>
							"The case feels durable and I even got a compliment on the design.
							Had the case for two and a half months now and{' '}
							<span className='p-0.5 bg-slate-800 text-white'>
								the image is super clear
							</span>
							, on the case I had before, the image started fading into
							yellow-ish color after a couple weeks. Love it."
						</p>
					}
					name='Jonathan'
					imageUrl='/users/user-1.png'
				/>
				<Review
					text={
						<p>
							"I usually keep my phone together with my keys in my pocket and
							that led to some pretty heavy scratchmarks on all of my last phone
							cases. This one, besides a barely noticeable scratch on the
							corner,{' '}
							<span className='p-0.5 bg-slate-800 text-white'>
								looks brand new after about half a year
							</span>
							. I dig it."
						</p>
					}
					name='Josh'
					imageUrl='/users/user-4.jpg'
				/>
			</Container>
      <div className='pt-16'>
        <AnimatedReviews />
      </div>
		</section>
	);
};
