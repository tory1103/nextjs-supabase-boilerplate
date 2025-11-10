import { isEmail, isMobilePhone } from 'validator';
import { z } from 'zod';

import { PasswordSchema } from '@/zod-schemas/password';

export const SignupWithEmailSchema = PasswordSchema.extend({
	validationPassword: PasswordSchema.shape.password,
	email: z.custom(isEmail, {
		message: 'Invalid email',
	}),
}).superRefine(({ password, validationPassword }, context) => {
	if (password !== validationPassword) {
		context.addIssue({
			code: 'custom',
			message: 'Passwords do not match',
			path: ['validationPassword'],
		});
	}
});

export const SignupWithPhoneSchema = PasswordSchema.extend({
	validationPassword: PasswordSchema.pick({ password: true }),
	phone: z.custom(isMobilePhone, {
		message: 'Invalid phone number',
	}),
}).superRefine(({ password, validationPassword }, context) => {
	if (password !== validationPassword) {
		context.addIssue({
			code: 'custom',
			message: 'Passwords do not match',
			path: ['validationPassword'],
		});
	}
});
