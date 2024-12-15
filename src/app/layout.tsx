import 'server-only';
import './globals.css';

import type { Metadata } from 'next';
import { ReactNode }     from 'react';

import { ThemeProvider }          from '@/components/ui/theme-provider';
import { Toaster }                from '@/components/ui/toaster';
import { AuthContextProvider }    from '@/hooks/use-auth';
import { createSupabaseSVClient } from '@/lib/supabase/server';


export const metadata: Metadata = {
	title      : 'Supabase Next.js Template',
	description: 'A template for building a Next.js app with Supabase.'
};

export default async function RootLayout
(
	{ children }:
		Readonly<{ children: ReactNode }>
)
{
	const
		{ auth }           = await createSupabaseSVClient(),
		{ data: { user } } = await auth.getUser();

	return (
		<html lang={ 'en' } suppressHydrationWarning>
		<body>
		<AuthContextProvider user={ user }>
			<ThemeProvider
				attribute={ 'class' }
				defaultTheme={ 'system' }
				enableSystem
				disableTransitionOnChange
			>
				<Toaster/>
				{ children }
			</ThemeProvider>
		</AuthContextProvider>
		</body>
		</html>
	);
}
