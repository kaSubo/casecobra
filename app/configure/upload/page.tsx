'use client';

import { Progress } from '@/components/ui';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { Image, Loader2Icon, MousePointerSquareDashed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';

export default function Page() {
	const { toast } = useToast();
	const { push } = useRouter();
	const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = React.useState<number>(0);

	const { startUpload, isUploading } = useUploadThing('imageUploader', {
		onClientUploadComplete: ([data]) => {
			const configId = data.serverData.configId;
			startTransition(() => push(`/configure/design/?id=${configId}`));
		},
		onUploadProgress(p) {
			setUploadProgress(p);
		},
	});

	const onDropRejected = (rejectedFiles: FileRejection[]) => {
		const [file] = rejectedFiles;
		setIsDragOver(false);
		toast({
			title: `${file.file.type} type is not supported`,
			description: 'Please choose a PNG, JPG or JPEG file',
			variant: 'destructive',
		});
	};
	const onDropAccepted = (acceptedFiles: File[]) => {
		startUpload(acceptedFiles, { configId: undefined });
		setIsDragOver(false);
	};

	const [isPending, startTransition] = React.useTransition();

	return (
		<div
			className={cn(
				'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center cursor-pointer',
				{ 'ring-blue-900/25 bg-blue-900/10': isDragOver }
			)}>
			<div className='relative flex flex-1 flex-col items-center justify-center w-full'>
				<Dropzone
					onDropRejected={onDropRejected}
					onDropAccepted={onDropAccepted}
					accept={{
						'image/png': ['.png'],
						'image/jpeg': ['.jpeg'],
						'image/jpg': ['.jpg'],
					}}
					onDragEnter={() => setIsDragOver(true)}
					onDragLeave={() => setIsDragOver(false)}>
					{({ getRootProps, getInputProps }) => (
						<div
							className='h-full w-full flex-1 flex flex-col items-center justify-center'
							{...getRootProps()}>
							<input {...getInputProps()} />
							{isDragOver ? (
								<MousePointerSquareDashed
									className='text-zinc-500 mb-2'
									size={24}
								/>
							) : isUploading || isPending ? (
								<Loader2Icon
									className='animate-spin text-zinc-500 mb-2'
									size={24}
								/>
							) : (
								<Image
									className='text-zinc-500 mb-2'
									size={24}
								/>
							)}
							<div className='flex flex-col justify-center mb-2 text-sm text-zinc-700'>
								{isUploading ? (
									<div className='flex flex-col items-center'>
										<p>Uploading...</p>
										<Progress
											className='mt-2 w-40 h-2 bg-gray-200'
											value={uploadProgress}
										/>
									</div>
								) : isPending ? (
									<div className='flex flex-col items-center'>
										<p>Redirecting, please wait...</p>
									</div>
								) : isDragOver ? (
									<p>
										<span className='font-semibold'>Drop file</span> to upload
									</p>
								) : (
									<p>
										<span className='font-semibold'>Click to upload</span> or
										drag and drop
									</p>
								)}
							</div>
							{isPending ? null : (
								<p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
							)}
						</div>
					)}
				</Dropzone>
			</div>
		</div>
	);
}
