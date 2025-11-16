import 'server-only';
import './globals.css';

import { type Metadata, type Viewport } from 'next';
import { Poppins } from 'next/font/google';
import type React from 'react';
import ReactQueryProvider from '@/lib/providers/reactQuery';

const font = Poppins({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Market Mind',
	description: '',
};

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
	const { children } = props;

	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={font.className} suppressHydrationWarning={true}>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	);
}
