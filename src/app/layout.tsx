import type { Metadata } from 'next';
import { ReactNode }     from 'react';

import './globals.css';


export const metadata: Metadata = {
	title      : 'Supabase Next.js Template',
	description: 'A template for building a Next.js app with Supabase.'
};

export default function RootLayout
(
	{ children }:
		Readonly<{ children: ReactNode }>
)
{
	return (
		<html lang="en">
		<body>
		{ children }
		</body>
		</html>
	);
}
