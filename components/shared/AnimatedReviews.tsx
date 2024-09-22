'use client';

import React from 'react';

import { PHONES } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import { Container } from './Container';
import { Phone } from './Phone';

function splitArray<T>(array: Array<T>, numParts: number) {
	const result: Array<Array<T>> = [];

	for (let i = 0; i < array.length; i++) {
		const index = i % numParts;
		if (!result[index]) {
			result[index] = [];
		}
		result[index].push(array[i]);
	}

	return result;
}

function ReviewColumn({
	reviews,
	className,
	reviewClassName,
	msPerPixel = 0,
}: {
	reviews: string[];
	className?: string;
	reviewClassName?: (reviewIndex: number) => string;
	msPerPixel?: number;
}) {
	const columnRef = React.useRef<HTMLDivElement | null>(null);
	const [columnHeight, setColumnHeight] = React.useState(0);
	const duration = `${columnHeight * msPerPixel}ms`;

	React.useEffect(() => {
		if (!columnRef.current) return;

		const resizeObserver = new window.ResizeObserver(() => {
			setColumnHeight(columnRef.current?.offsetHeight ?? 0);
		});

		resizeObserver.observe(columnRef.current);

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	return (
		<div
			ref={columnRef}
			className={cn('animate-marquee space-y-8 py-4', className)}
			style={{ '--marquee-duration': duration } as React.CSSProperties}>
			{reviews.concat(reviews).map((imageUrl, reviewIndex) => (
				<PhoneReview
					key={reviewIndex}
					className={reviewClassName?.(reviewIndex % reviews.length)}
					imageUrl={imageUrl}
				/>
			))}
		</div>
	);
}

interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
	imageUrl: string;
}

function PhoneReview({ imageUrl, className, ...props }: ReviewProps) {
	const POSSIBLE_ANIMATION_DELAYS = [
		'0s',
		'0.1s',
		'0.2s',
		'0.3s',
		'0.4s',
		'0.5s',
	];

	const animationDelay =
		POSSIBLE_ANIMATION_DELAYS[
			Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
		];

	return (
		<div
			className={cn(
				'animate-fade-in flex justify-center items-center w-[267px] rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',
				className
			)}
			style={{ animationDelay }}
			{...props}>
			<Phone imageUrl={imageUrl} />
		</div>
	);
}

function ReviewGrid() {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.4 });
	const columns = splitArray(PHONES, 3);
	const column1 = columns[0];
	const column2 = columns[1];
	const column3 = splitArray(columns[2], 2);

	return (
		<div
			ref={containerRef}
			className='relative mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start justify-items-center gap-8 overflow-hidden px-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3'>
			{isInView ? (
				<>
					<ReviewColumn
						reviews={[...column1, ...column3.flat(), ...column2]}
						reviewClassName={(reviewIndex) =>
							cn({
								'md:hidden': reviewIndex >= column1.length + column3[0].length,
								'lg:hidden': reviewIndex >= column1.length,
							})
						}
						msPerPixel={10}
					/>
					<ReviewColumn
						reviews={[...column2, ...column3[1]]}
						className='hidden sm:block'
						reviewClassName={(reviewIndex) =>
							reviewIndex >= column2.length ? 'lg:hidden' : ''
						}
						msPerPixel={15}   
					/>
					<ReviewColumn
						reviews={column3.flat()}
						className='hidden lg:block'
						msPerPixel={10}
					/>
				</>
			) : null}
			<div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100' />
			<div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100' />
		</div>
	);
}

export function AnimatedReviews() {
	return (
		<Container className='relative max-w-5xl'>
			<Image
				src='/what-people-are-buying.png'
				alt='What people are buying'
				width={256}
				height={190}
				aria-hidden='true'
				className='absolute select-none hidden xl:block -left-32 top-1/3'
			/>

			<ReviewGrid />
		</Container>
	);
}
