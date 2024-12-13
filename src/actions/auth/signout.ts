'use server';

import { createSupabaseSVClient } from '@/lib/supabase/server';
import { ServerActionReturn }     from '@/types/server-action-return';


export async function signoutAction(): Promise<ServerActionReturn<void, {}>>
{
	const
		{ auth }  = await createSupabaseSVClient(),
		{ error } = await auth.signOut();

	if ( error ) return {
		success: false,
		error  : { code: 'AUTH-SGOUT-001', message: error.message }
	};

	return {
		success: true,
		data   : undefined
	};
}