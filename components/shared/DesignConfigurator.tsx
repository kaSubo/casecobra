'use client';

import { saveConfig as _saveConfig } from '@/app/configure/design/actions';
import { HandleComponent, Title } from '@/components/shared';
import {
	AspectRatio,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Label,
	ScrollArea,
	Separator,
} from '@/components/ui';
import { BASE_PRICE } from '@/config/products';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { base64ToBlob, cn, formatPrice } from '@/lib/utils';
import type { SaveConfigArgs } from '@/types';
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/option-validator';
import {
	Description,
	RadioGroup,
	Label as RadioLabel,
	Radio as RadioOption,
} from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Rnd } from 'react-rnd';

interface Props {
	configId: string;
	imageUrl: string;
	imageDimensions: { width: number; height: number };
	className?: string;
}

export const DesignConfigurator: React.FC<Props> = ({
	className,
	configId,
	imageUrl,
	imageDimensions,
}) => {
	const { startUpload } = useUploadThing('imageUploader');
	const { toast } = useToast();
	const { push } = useRouter();

	const { mutate: saveConfig, isPending } = useMutation({
		mutationKey: ['save-config'],
		mutationFn: async (args: SaveConfigArgs) => {
			await Promise.all([saveConfiguration(), _saveConfig(args)]);
		},
		onError: () => {
			toast({
				title: 'Something went wrong',
				description: 'There was an error saving your configuration. Please try again.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			push(`/configure/preview/?id=${configId}`);
		},
	});

	const [options, setOptions] = React.useState<{
		color: (typeof COLORS)[number];
		model: (typeof MODELS.options)[number];
		material: (typeof MATERIALS.options)[number];
		finish: (typeof FINISHES.options)[number];
	}>({
		color: COLORS[0],
		model: MODELS.options[MODELS.options.length - 1],
		material: MATERIALS.options[0],
		finish: FINISHES.options[0],
	});

	const [renderredDimension, setRenderredDimension] = React.useState({
		width: imageDimensions.width / 4,
		height: imageDimensions.height / 4,
	});
	const [renderredPosition, setRenderredPosition] = React.useState({
		x: 150,
		y: 205,
	});

	const phoneCaseRef = React.useRef<HTMLDivElement>(null);
	const containerRef = React.useRef<HTMLDivElement>(null);

	async function saveConfiguration() {
		try {
			const {
				left: caseLeft,
				top: caseTop,
				width,
				height,
			} = phoneCaseRef.current!.getBoundingClientRect();
			const { left: containerLeft, top: containerTop } =
				containerRef.current!.getBoundingClientRect();
			const leftOffset = caseLeft - containerLeft;
			const topOffset = caseTop - containerTop;

			const actualX = renderredPosition.x - leftOffset;
			const actualY = renderredPosition.y - topOffset;

			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext('2d');

			const userImage = new Image();
			userImage.crossOrigin = 'anonymous';
			userImage.src = imageUrl;
			await new Promise((resolve) => (userImage.onload = resolve));

			ctx?.drawImage(
				userImage,
				actualX,
				actualY,
				renderredDimension.width,
				renderredDimension.height
			);

			const base64 = canvas.toDataURL();
			const base64Data = base64.split(',')[1];

			const blob = base64ToBlob(base64Data, 'image/png');
			const file = new File([blob], 'filename.png', { type: 'image/png' });

			await startUpload([file], { configId });
		} catch (error) {
			console.error(`Failed to save image configuration: ${error}`);
			toast({
				title: 'Something went wrong',
				description: 'Failed to save image configuration, please try again.',
				variant: 'destructive',
			});
		}
	}

	return (
		<div
			className={cn(
				'relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20',
				className
			)}>
			<div
				ref={containerRef}
				className='relative h-[37.5rem] overflow-hidden col-span-full lg:col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'>
				<div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
					<AspectRatio
						ref={phoneCaseRef}
						ratio={896 / 1831}
						className='pointer-events-none relative z-50 aspect-[896/1831] w-full'>
						<NextImage
							src='/phone-template.png'
							alt='Phone template'
							fill
							className='pointer-events-none select-none z-50'
						/>
					</AspectRatio>
					<div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(299,231,235,0.6)]' />
					<div
						className={cn(
							'absolute inset-o left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
							`bg-${options.color.tw}`
						)}
					/>
				</div>
				<Rnd
					default={{
						x: 150,
						y: 205,
						height: imageDimensions.height / 4,
						width: imageDimensions.width / 4,
					}}
					onResizeStop={(_, __, ref, ___, { x, y }) => {
						setRenderredDimension({
							height: parseInt(ref.style.height.slice(0, -2)),
							width: parseInt(ref.style.width.slice(0, -2)),
						});

						setRenderredPosition({ x, y });
					}}
					onDragStop={(_, data) => {
						const { x, y } = data;
						setRenderredPosition({ x, y });
					}}
					lockAspectRatio
					resizeHandleComponent={{
						bottomRight: <HandleComponent />,
						bottomLeft: <HandleComponent />,
						topRight: <HandleComponent />,
						topLeft: <HandleComponent />,
					}}
					className='absolute z-20 border-[2px] border-primary'>
					<div className='relative w-full h-full'>
						<NextImage
							src={imageUrl}
							alt='Your image'
							fill
							className='pointer-events-none'
						/>
					</div>
				</Rnd>
			</div>
			<div className='h-[37.5rem] flex flex-col bg-white'>
				<ScrollArea className='relative flex-1 overflow-auto'>
					<div
						aria-hidden='true'
						className='absolute z-10 inset-x-0 bottom-0 height-12 bg-gradient-to-t from-white pointer-events-none'
					/>

					<div className='px-8 pb-12 pt-8'>
						<Title
							className='tracking-tight font-bold text-balance'
							text='Customize your case'
							size='lg'
						/>
						<Separator />
						<div className='relative mt-4 h-full flex flex-col justify-between'>
							<div className='flex flex-col gap-6'>
								<RadioGroup
									value={options.color}
									onChange={(val) => {
										setOptions((prev) => ({
											...prev,
											color: val,
										}));
									}}>
									<Label>Color: {options.color.label}</Label>
									<div className='mt-3 flex items-center space-x-3'>
										{COLORS.map((color) => (
											<RadioOption
												key={color.label}
												value={color}
												className={({ checked }) =>
													cn(
														'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
														{
															[`border-${color.tw}`]: checked,
														}
													)
												}>
												<span
													className={cn(
														`bg-${color.tw}`,
														'size-8 rounded-full border border-black border-opacity-10'
													)}
												/>
											</RadioOption>
										))}
									</div>
								</RadioGroup>

								<div className='relative flex flex-col gap-3 w-full'>
									<Label>Model</Label>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant='outline'
												role='combobox'
												className='w-full justify-between'>
												{options.model.label}
												<ChevronsUpDownIcon
													className='ml-2 shrink-0 opacity-50'
													size={16}
												/>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{MODELS.options.map((model) => (
												<DropdownMenuItem
													key={model.label}
													className={cn(
														'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
														{
															'bg-zinc-100': model.label === options.model.label,
														}
													)}
													onClick={() => {
														setOptions((prev) => ({ ...prev, model }));
													}}>
													<CheckIcon
														className={cn(
															'mr-2',
															model.label === options.model.label
																? 'opacity-100'
																: 'opacity-0'
														)}
														size={16}
													/>
													{model.label}
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								{[MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
									<RadioGroup
										key={name}
										value={options[name]}
										onChange={(val) => {
											setOptions((prev) => ({ ...prev, [name]: val }));
										}}>
										<Label>{name.slice(0, 1).toUpperCase() + name.slice(1)}</Label>
										<div className='mt-3 space-y-4'>
											{selectableOptions.map((option) => (
												<RadioOption
													key={option.label}
													value={option}
													className={({ checked }) =>
														cn(
															'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shdow-sm border-2 border-zinc-200 foces:otline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
															{
																'border-primary': checked,
															}
														)
													}>
													<span className='flex items-center'>
														<span className='flex flex-col text-sm'>
															<RadioLabel
																className='font-medium text-gray-900'
																as='span'>
																{option.label}
															</RadioLabel>
															{option.description && (
																<Description
																	as='span'
																	className='text-gray-500'>
																	<span className='block sm:inline'>
																		{option.description}
																	</span>
																</Description>
															)}
														</span>
													</span>
													<Description
														as='span'
														className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
														<span className='font-medium text-gray-900'>
															{formatPrice(option.price / 100)}
														</span>
													</Description>
												</RadioOption>
											))}
										</div>
									</RadioGroup>
								))}
							</div>
						</div>
					</div>
				</ScrollArea>
				<div className='w-full px-8 h-16 bg-white'>
					<Separator />
					<div className='size-full flex justify-end items-center'>
						<div className='w-full flex items-center gap-6 '>
							<p className='font-medium whitespace-normal'>
								{formatPrice(
									(BASE_PRICE + options.finish.price + options.material.price) / 100
								)}
							</p>
							<Button
								onClick={() =>
									saveConfig({
										configId,
										color: options.color.value,
										finish: options.finish.value,
										material: options.material.value,
										model: options.model.value,
									})
								}
								disabled={isPending}
								isLoading={isPending}
								loadingText='Saving'
								size='sm'
								className='w-full'>
								Continue
								<ArrowRight
									className='inlie ml-1.5'
									size={16}
								/>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
