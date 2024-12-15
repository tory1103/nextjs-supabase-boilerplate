'use server';

import { ZodIssue }               from 'zod';

import {
	SignupWithEmail,
	SignupWithPhone
}                                 from '@/actions/auth/types';
import { createSupabaseSVClient } from '@/lib/supabase/server';
import { ServerActionReturn }     from '@/types/server-action-return';
import {
	SignupWithEmailSchema,
	SignupWithPhoneSchema
}                                 from '@/zod-schemas/auth/signup';


export async function signupWithEmailAction( { email, password, validationPassword }: SignupWithEmail ):
	Promise<ServerActionReturn<void, { zodValidation?: ZodIssue[] }>>
{
	const schemaValidation = await SignupWithEmailSchema.safeParseAsync( { email, password, validationPassword } );

	if ( !schemaValidation.success ) return {
		success: false,
		error  : { code: 'AUTH-SGUP-001', message: 'Invalid email or password', zodValidation: schemaValidation.error?.issues }
	};

	const
		{ auth }  = await createSupabaseSVClient(),
		{ error } = await auth.signUp( { email, password } );

	if ( error ) return {
		success: false,
		error  : { code: 'AUTH-SGUP-003', message: error.message }
	};

	return {
		success: true,
		data   : undefined
	};
}

export async function signupWithPhoneAction( { phone, password, validationPassword }: SignupWithPhone ):
	Promise<ServerActionReturn<void, { zodValidation?: ZodIssue[] }>>
{
	const schemaValidation = SignupWithPhoneSchema.safeParse( { phone, password, validationPassword } );

	if ( !schemaValidation.success ) return {
		success: false,
		error  : { code: 'AUTH-SGUP-005', message: 'Invalid phone number or password', zodValidation: schemaValidation.error?.issues }
	};

	const
		{ auth }  = await createSupabaseSVClient(),
		{ error } = await auth.signUp( { phone, password } );

	if ( error ) return {
		success: false,
		error  : { code: 'AUTH-SGUP-006', message: error.message }
	};

	return {
		success: true,
		data   : undefined
	};
}