'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
