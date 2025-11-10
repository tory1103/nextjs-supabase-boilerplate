'use server';

import { type ZodIssue } from 'zod';

import { type SigninWithEmail, type SigninWithPhone } from '@/actions/auth/types';
import { createSupabaseSVClient } from '@/lib/supabase/server';
import { type ServerActionReturn } from '@/types/server-action-return';
import { SigninWithEmailSchema, SigninWithPhoneSchema } from '@/zod-schemas/auth/signin';

export async function signinWithEmailAction({
	email,
	password,
}: SigninWithEmail): Promise<ServerActionReturn<void, { zodValidation?: ZodIssue[] }>> {
	const schemaValidation = await SigninWithEmailSchema.safeParseAsync({ email, password });

	if (!schemaValidation.success) {
		return {
			success: false,
			error: {
				code: 'AUTH-SGIN-001',
				message: 'Invalid email or password',
				zodValidation: schemaValidation.error?.issues,
			},
		};
	}

	const { auth } = await createSupabaseSVClient();
	const { error } = await auth.signInWithPassword({ email, password });

	if (error) {
		return {
			success: false,
			error: { code: 'AUTH-SGIN-003', message: error.message },
		};
	}

	return {
		success: true,
		data: undefined,
	};
}

export async function signinWithPhoneAction({
	phone,
	password,
}: SigninWithPhone): Promise<ServerActionReturn<void, { zodValidation?: ZodIssue[] }>> {
	const schemaValidation = await SigninWithPhoneSchema.safeParseAsync({ phone, password });

	if (!schemaValidation.success) {
		return {
			success: false,
			error: {
				code: 'AUTH-SGIN-005',
				message: 'Invalid phone or password',
				zodValidation: schemaValidation.error?.issues,
			},
		};
	}

	const { auth } = await createSupabaseSVClient();
	const { error } = await auth.signInWithPassword({ phone, password });

	if (error) {
		return {
			success: false,
			error: { code: 'AUTH-SGIN-006', message: error.message },
		};
	}

	return {
		success: true,
		data: undefined,
	};
}

export async function signinAnonymouslyAction(): Promise<ServerActionReturn<void, {}>> {
	const { auth } = await createSupabaseSVClient();
	const { error } = await auth.signInAnonymously();

	if (error) {
		return {
			success: false,
			error: { code: 'AUTH-SGIN-007', message: error.message },
		};
	}

	return {
		success: true,
		data: undefined,
	};
}
