import { isEmail, isStrongPassword } from 'validator';
import { z } from 'zod';

export const signinWithEmailSchema = z.object({
	email: z.string().refine(isEmail, {
		error: 'Invalid email address',
	}),
	password: z.string().refine(isStrongPassword, {
		error:
			'Must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol',
	}),
});

export type SigninWithEmailInput = z.input<typeof signinWithEmailSchema>;
export type SigninWithEmailOutput = z.output<typeof signinWithEmailSchema>;
