'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type React from 'react';
import { useState } from 'react';

const MIN30 = 1_800_000 as const;

interface ReactQueryProviderProps {
	children: React.ReactNode;
}

const ReactQueryProvider = (props: Readonly<ReactQueryProviderProps>) => {
	const { children } = props;

	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: MIN30, // 30 minutos
						gcTime: MIN30, // 30 minutos
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{children}
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
