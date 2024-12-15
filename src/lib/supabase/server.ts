'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies }            from 'next/headers';


export async function createSupabaseSVClient()
{
	const { getAll, set } = await cookies();

	return createServerClient
	(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookieOptions: {
				path    : '/',
				sameSite: 'lax',
				httpOnly: true,
				expires : new Date( Date.now() + 60 * 60 * 1000 ) // 1 hour
			},
			cookies      : {
				getAll,
				setAll( cookiesToSet )
				{
					try
					{
						cookiesToSet.forEach
						(
							( { name, value, options } ) =>
								set( name, value, options )
						);
					}
					catch
					{}
				}
			}
		}
	);
}