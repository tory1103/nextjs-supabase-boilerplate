'use server';

import { type ZodError } from 'zod';
import { usersCreateAction } from '@/actions';
import { fallbackRedirect, withGuards } from '@/lib';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { type ServerActionReturnPromise } from '@/types';
import { type SignupWithEmailInput, type SignupWithEmailOutput, signupWithEmailSchema } from '@/zodSchemas';

type Input = SignupWithEmailInput;
type Output = SignupWithEmailOutput;

type Error = {
	zodIssues?: ZodError['issues'];
};

const SCOPE = 'SIGNUP';

const handler = async (args: Input): ServerActionReturnPromise<Output, Error> => {
	const { email, password } = args;

	const schema = await signupWithEmailSchema.safeParseAsync(args);
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
	const {
		error,
		data: { user },
	} = await auth.signUp({
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

	if (user) {
		await usersCreateAction({
			email,
			username: email,
		});
	}

	return {
		success: true,
		data: schema.data,
	};
};

export const signupWithEmailAction = async (args: Input): Promise<Output> => {
	const handlerWithGuards = await withGuards(handler, fallbackRedirect);

	const guards = await handlerWithGuards(args);
	if (!guards.success) {
		throw new Error('ERROR: Signup guards');
	}

	if (!guards.data.success) {
		throw new Error(`[${guards.data.error.code}] ${guards.data.error.message}`);
	}

	return guards.data.data;
};
