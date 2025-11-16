'use server';

import { type ZodError } from 'zod';
import { fallbackRedirect, withGuards } from '@/lib';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { type ServerActionReturnPromise } from '@/types';
import { type SigninWithEmailInput, type SigninWithEmailOutput, signinWithEmailSchema } from '@/zodSchemas';

type Input = SigninWithEmailInput;
type Output = SigninWithEmailOutput;

type Error = {
	zodIssues?: ZodError['issues'];
};

const SCOPE = 'SIGNIN';

const handler = async (args: Input): ServerActionReturnPromise<Output, Error> => {
	const { email, password } = args;

	const schema = await signinWithEmailSchema.safeParseAsync(args);
	if (!schema.success) {
		return {
			success: false,
			error: {
				code: `${SCOPE}-001`,
				message: 'Invalid email or password',
				zodIssues: schema.error?.issues,
			},
		};
	}

	const { auth } = await createSupabaseServerClient();
	const { error } = await auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return {
			success: false,
			error: {
				code: `${SCOPE}-002`,
				message: error.message,
			},
		};
	}

	return {
		success: true,
		data: schema.data,
	};
};

export const signinWithEmailAction = async (args: Input): Promise<Output> => {
	const handlerWithGuards = await withGuards(handler, fallbackRedirect);

	const guards = await handlerWithGuards(args);
	if (!guards.success) {
		throw new Error('ERROR: Signin guards');
	}

	if (!guards.data.success) {
		throw new Error(`[${guards.data.error.code}] ${guards.data.error.message}`);
	}

	return guards.data.data;
};
