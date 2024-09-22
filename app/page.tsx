import { Hero, Promo, Reviews } from '@/components/shared';

export default function Home() {
	return (
		<div className='bg-slate-50'>
			<Hero />
			<Reviews />
			<Promo />
		</div>
	);
}
