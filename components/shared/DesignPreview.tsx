'use client';

import { createCheckoutSession } from '@/app/configure/preview/actions';
import { LoginModal, Phone } from '@/components/shared';
import { Button, Separator } from '@/components/ui';
import { BASE_PRICE, PRODUCTS_PRICES } from '@/config/products';
import { FEATURES_HIGHLIGHTS, MATERIALS_HIGHLIGHTS } from '@/constants/constants';
import { useToast } from '@/hooks/use-toast';
import { cn, formatPrice } from '@/lib/utils';
import { COLORS, MODELS } from '@/validators/option-validator';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Configuration } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
	className?: string;
	configuration: Configuration;
}

export const DesignPreview: React.FC<Props> = ({ className, configuration }) => {
	const { color, finish, material, model, croppedImageUrl, id } = configuration;
	const { push } = useRouter();
	const { toast } = useToast();
	const { user } = useKindeBrowserClient();

	const [isLoginModalOpen, setIsLoginModalOpen] = React.useState<boolean>(false);

	const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw;
	const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!;

	let totalPrice = BASE_PRICE;
	if (finish === 'textured') totalPrice += PRODUCTS_PRICES.finsh.textured;
	if (material === 'polycarbonate') totalPrice += PRODUCTS_PRICES.material.polycarbonate;

	const { mutate: createPaymentSession } = useMutation({
		mutationKey: ['get-checkout-session'],
		mutationFn: createCheckoutSession,
		onSuccess: ({ url }) => {
			if (url) {
				push(url);
			} else throw new Error('Unable to retrieve payment URL.');
		},
		onError: () => {
			toast({
				title: 'Something went wrong',
				description: 'There was an error on our end. Please try again.',
				variant: 'destructive',
			});
		},
	});

	const handleCheckout = () => {
		if (user) {
			createPaymentSession({ configId: id });
		} else {
			localStorage.setItem('configurationId', id);
			setIsLoginModalOpen(true);
		}
	};

	return (
		<>
			<LoginModal
				isOpen={isLoginModalOpen}
				setIsOpen={setIsLoginModalOpen}
			/>
			<div
				className={cn(
					'mt-20 flex flex-col items-center md:grid gap-y-2 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12',
					className
				)}>
				<div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
					<Phone
						imageUrl={croppedImageUrl!}
						className={cn(`bg-${tw}`, 'max-w-[150px] md:max-w-full')}
					/>
				</div>
				<div className='mt-6 sm:col-span-9 md:row-end-1'>
					<h3 className='text-3xl font-bold tracking-tight text-gray-900'>
						Your {modelLabel} Case
					</h3>
					<div className='mt-3 flex items-center gap-1.5 text-base'>
						<CheckIcon
							className='text-green-500'
							size={16}
						/>
						In stock and ready to ship
					</div>
				</div>
				<div className='sm:col-span-12 md:col-span-9 text-base'>
					<div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
						<div>
							<p className='font-medium text-zinc-950'>Highlights</p>
							<ol className='mt-3 text-zinc-700 list-disc list-inside'>
								{FEATURES_HIGHLIGHTS.map((highlight) => (
									<li key={highlight}>{highlight}</li>
								))}
							</ol>
						</div>
						<div>
							<p className='font-medium text-zinc-950'>Materials</p>
							<ol className='mt-3 text-zinc-700 list-disc list-inside'>
								{MATERIALS_HIGHLIGHTS.map((material) => (
									<li key={material}>{material}</li>
								))}
							</ol>
						</div>
					</div>
					<div className='mt-8'>
						<div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
							<div className='flow-root text-sm'>
								<div className='flex items-center justify-between py-1 mt-2'>
									<p className='text-gray-600'>Base price</p>
									<p className='font-medium text-gray-900'>
										{formatPrice(BASE_PRICE / 100)}
									</p>
								</div>

								{finish === 'textured' && (
									<div className='flex items-center justify-between py-1 mt-2'>
										<p className='text-gray-600'>Textured finish</p>
										<p className='font-medium text-gray-900'>
											{formatPrice(PRODUCTS_PRICES.finsh.textured / 100)}
										</p>
									</div>
								)}

								{material === 'polycarbonate' && (
									<div className='flex items-center justify-between py-1 mt-2'>
										<p className='text-gray-600'>Soft polycarbonate material</p>
										<p className='font-medium text-gray-900'>
											{formatPrice(PRODUCTS_PRICES.material.polycarbonate / 100)}
										</p>
									</div>
								)}

								<Separator className='my-2' />

								<div className='flex items-center justify-between py-2'>
									<p className='font-semibold text-gray-900'>Order total</p>
									<p className='font-semibold text-gray-900'>
										{formatPrice(totalPrice / 100)}
									</p>
								</div>
							</div>
						</div>
						<div className='mt-8 flex justify-end pb-12'>
							<Button
								className='px-4 sm:px-6 lg:px-8'
								onClick={() => handleCheckout()}>
								Checkout
								<ArrowRight
									className='ml-1.5 inline'
									size={16}
								/>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
