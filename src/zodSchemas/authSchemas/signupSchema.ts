import { isEmail, isStrongPassword } from 'validator';
import { z } from 'zod';

export const signupWithEmailSchema = z
	.object({
		email: z.string().refine(isEmail, {
			error: 'Invalid email address',
		}),
		password: z.string().refine(isStrongPassword, {
			error:
				'Must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol',
		}),
		repeatPassword: z.string().refine(isStrongPassword, {
			error:
				'Must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol',
		}),
	})
	.refine(schema => schema.password === schema.repeatPassword, {
		error: 'Passwords do not match',
	});

export type SignupWithEmailInput = z.input<typeof signupWithEmailSchema>;
export type SignupWithEmailOutput = z.output<typeof signupWithEmailSchema>;
