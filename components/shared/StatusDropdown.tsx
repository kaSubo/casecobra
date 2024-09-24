'use client';

import { OrderStatus } from '@prisma/client';
import React from 'react';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { changeOrderStatus } from '@/app/dashboard/actions';
import { useRouter } from 'next/navigation';

interface Props {
	id: string;
	orderStatus: OrderStatus;
}

const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
	awaiting_shipment: 'Awaiting Shipment',
	fulfilled: 'Fulfilled',
	shipped: 'Shipped',
};

export const StatusDropdown: React.FC<Props> = ({ id, orderStatus }) => {
	const { refresh } = useRouter();
	const { mutate } = useMutation({
		mutationKey: ['update-order-status'],
		mutationFn: changeOrderStatus,
		onSuccess: () => refresh(),
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className='w-52 flex justify-between items-center'>
					<span
						className={cn('size-2 rounded-full mr-2 bg-zinc-900', {
							'bg-green-600': orderStatus === 'fulfilled',
							'bg-yellow-500': orderStatus === 'awaiting_shipment',
							'bg-slate-400': orderStatus === 'shipped',
						})}></span>
					{LABEL_MAP[orderStatus]}
					<ChevronsUpDown
						className='ml-2 shrink-0 opacity-50'
						size={16}
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='p-0'>
				{Object.keys(OrderStatus).map((status) => (
					<DropdownMenuItem
						key={status}
						onClick={() => mutate({ id, newStatus: status as OrderStatus })}
						className={cn(
							'flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100',
							{
								'bg-zinc-100': orderStatus === status,
							}
						)}>
						<Check
							className={cn(
								'mr-2 size-4 text-primary',
								orderStatus === status ? 'opacity-100' : 'opacity-0'
							)}
						/>
						{LABEL_MAP[status as OrderStatus]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
