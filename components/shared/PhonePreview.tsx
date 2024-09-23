'use client';

import type { CaseColor } from '@prisma/client';
import React from 'react';
import { AspectRatio } from '@/components/ui';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
	croppedImageUrl: string;
	color: CaseColor;
	className?: string;
}

export const PhonePreview: React.FC<Props> = ({ croppedImageUrl, color, className }) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [renderedDimensions, setRenderedDimensions] = React.useState({
		height: 0,
		width: 0,
	});

	const handleResize = () => {
		if (!ref.current) return;

		const { width, height } = ref.current.getBoundingClientRect();
		setRenderedDimensions({ width, height });
	};

	React.useEffect(() => {
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [ref.current]);

	let caseBackgroundColor;
	switch (color) {
		case 'blue':
			caseBackgroundColor = 'bg-blue-950';
			break;
		case 'rose':
			caseBackgroundColor = 'bg-rose-950';
			break;
		case 'green':
			caseBackgroundColor = 'bg-green-900';
			break;
		default:
			caseBackgroundColor = 'bg-zinc-900';
			break;
	}

	return (
		<AspectRatio
			ref={ref}
			ratio={3000 / 2001}
			className={cn('relative', className)}>
			<div
				style={{
					left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
					top: renderedDimensions.height / 6.22,
				}}
				className='absolute z-20 scale-[1.0352]'>
				<Image
					src={croppedImageUrl}
					alt='User custom image'
					width={renderedDimensions.width / (3000 / 637)}
					height={312}
					className={cn(
						'phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',
						caseBackgroundColor
					)}
				/>
			</div>
			<div className='relative size-full z-40'>
				<Image
					src='/clearphone.png'
					alt='Phone template'
					fill
					className='pointer-events-none size-full antialiased rounded-md'
				/>
			</div>
		</AspectRatio>
	);
};
