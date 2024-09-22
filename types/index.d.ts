import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client';

declare type PageProps = {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
};

declare type SaveConfigArgs = {
	color: CaseColor;
	finish: CaseFinish;
	material: CaseMaterial;
	model: PhoneModel;
	configId: string;
};
