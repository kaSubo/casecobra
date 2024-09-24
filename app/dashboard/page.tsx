import { StatusDropdown } from '@/components/shared';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Progress,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui';
import { formatPrice } from '@/lib/utils';
import prisma from '@/prisma/prismaClient';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { notFound } from 'next/navigation';

export default async function Page() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
	if (!user || user.email !== ADMIN_EMAIL) {
		return notFound();
	}

	const ordres = await prisma.order.findMany({
		where: {
			isPaid: true,
			createdAt: {
				gte: new Date(new Date().setDate(new Date().getDate() - 7)),
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			user: true,
			shippingAddress: true,
		},
	});

	if (!ordres) {
		return (
			<div className='flex flex-col justify-center items-center min-h-screen w-full bg-muted/40'>
				<div className='flex flex-col justify-center items-center p-3 w-32 h-36 rounded-2xl bg-slate-100/60 border border-zinc-300'>
					So quiet...
				</div>
			</div>
		);
	}

	const lastWeekSum = await prisma.order.aggregate({
		where: {
			isPaid: true,
			createdAt: {
				gte: new Date(new Date().setDate(new Date().getDate() - 7)),
			},
		},
		_sum: {
			amount: true,
		},
	});
	const lastMonthSum = await prisma.order.aggregate({
		where: {
			isPaid: true,
			createdAt: {
				gte: new Date(new Date().setDate(new Date().getDate() - 30)),
			},
		},
		_sum: {
			amount: true,
		},
	});

	const WEEKLY_GOAL = 500;
	const MONTHLY_GOAL = 2500;

	return (
		<div className='flex min-h-screen w-full bg-muted/40'>
			<div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4'>
				<div className='flex flex-col gap-16'>
					<div className='grid gap-4 sm:grid-cols-2'>
						<Card>
							<CardHeader className='pb-2'>
								<CardDescription>Last Week</CardDescription>
								<CardTitle className='text-4xl'>
									{formatPrice(lastWeekSum._sum.amount ?? 0)}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-sm text-muted-foreground'>
									of {formatPrice(WEEKLY_GOAL)} goal
								</div>
							</CardContent>
							<CardFooter>
								<Progress value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL} />
							</CardFooter>
						</Card>
						<Card>
							<CardHeader className='pb-2'>
								<CardDescription>Last Month</CardDescription>
								<CardTitle className='text-4xl'>
									{formatPrice(lastMonthSum._sum.amount ?? 0)}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-sm text-muted-foreground'>
									of {formatPrice(MONTHLY_GOAL)} goal
								</div>
							</CardContent>
							<CardFooter>
								<Progress
									value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
								/>
							</CardFooter>
						</Card>
					</div>
					<h1 className='text-4xl font-bold tracking-tight'>Incoming orders</h1>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer</TableHead>
								<TableHead className='hidden sm:table-cell'>Status</TableHead>
								<TableHead className='hidden sm:table-cell'>Purchase date</TableHead>
								<TableHead className='text-right'>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{ordres.map((order) => (
								<TableRow
									key={order.id}
									className='bg-accent'>
									<TableCell>
										<div className='font-medium'>{order.shippingAddress?.name}</div>
										<div className='hidden text-sm text-muted-foreground sm:inline'>
											{order.user.email}
										</div>
									</TableCell>
									<TableCell className='hidden sm:table-cell'>
										<StatusDropdown
											id={order.id}
											orderStatus={order.status}
										/>
									</TableCell>
									<TableCell className='hidden sm:table-cell'>
										{order.createdAt.toLocaleDateString()}
									</TableCell>
									<TableCell className='text-right'>
										{formatPrice(order.amount)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
