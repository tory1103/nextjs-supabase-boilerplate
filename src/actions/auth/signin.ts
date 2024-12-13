'use server';


import {
	isEmail,
	isMobilePhone
}                                 from 'validator';

import {
	SignWithEmail,
	SignWithPhone
}                                 from '@/actions/auth/types';
import { createSupabaseSVClient } from '@/lib/supabase/server';
import { isValidPassword }        from '@/lib/utils';
import { ServerActionReturn }     from '@/types/server-action-return';


export async function signinWithEmailAction( { email, password }: SignWithEmail ): Promise<ServerActionReturn<void, {}>>
{
	if ( !isEmail( email ) ) return {
		success: false,
		error  : { code: 'AUTH-SGIN-001', message: 'Invalid email' }
	};

	if ( !isValidPassword( password ) ) return {
		success: false,
		error  : {
			code   : 'AUTH-SGIN-002',
			message: 'Must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol'
		}
	};

	const
		{ auth }  = await createSupabaseSVClient(),
		{ error } = await auth.signInWithPassword( { email, password } );

	if ( error ) return {
		success: false,
		error  : { code: 'AUTH-SGIN-003', message: error.message }
	};

	return {
		success: true,
		data   : undefined
	};
}

export async function signinWithPhoneAction( { phone, password }: SignWithPhone ): Promise<ServerActionReturn<void, {}>>
{
	if ( !isMobilePhone( phone ) ) return {
		success: false,
		error  : { code: 'AUTH-SGIN-004', message: 'Invalid phone number' }
	};

	if ( !isValidPassword( password ) ) return {
		success: false,
		error  : {
			code   : 'AUTH-SGIN-005',
			message: 'Must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol'
		}
	};

	const
		{ auth }  = await createSupabaseSVClient(),
		{ error } = await auth.signInWithPassword( { phone, password } );

	if ( error ) return {
		success: false,
		error  : { code: 'AUTH-SGIN-006', message: error.message }
	};

	return {
		success: true,
		data   : undefined
	};
}

export async function signinAnonymouslyAction(): Promise<ServerActionReturn<void, {}>>
{
	const
		{ auth }  = await createSupabaseSVClient(),
		{ error } = await auth.signInAnonymously();

	if ( error ) return {
		success: false,
		error  : { code: 'AUTH-SGIN-007', message: error.message }
	};

	return {
		success: true,
		data   : undefined
	};
}