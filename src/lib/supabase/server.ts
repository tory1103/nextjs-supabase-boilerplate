'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// biome-ignore lint/style/noMagicNumbers: <Ignore numbers>
const COOKIE_EXPIRES = 60 * 60 * 1000; // 1 hour

const _createSupabaseServerClient = async () => {
	const { getAll, set } = await cookies();

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (url && anonKey) {
		return createServerClient(url, anonKey, {
			cookieOptions: {
				path: '/',
				sameSite: 'lax',
				httpOnly: true,
				expires: new Date(Date.now() + COOKIE_EXPIRES),
			},
			cookies: {
				getAll,
				setAll(cookiesToSet) {
					try {
						for (const { name, value, options } of cookiesToSet) {
							set(name, value, options);
						}
					} catch {}
				},
			},
		});
	}
};

export const createSupabaseServerClient = async () => {
	const supabase = await _createSupabaseServerClient();
	return supabase || redirect('/');
};
