import {
	isEmail,
	isMobilePhone
}                         from 'validator';
import { z }              from 'zod';

import { PasswordSchema } from '@/zod-schemas/password';


export const SigninWithEmailSchema = PasswordSchema.extend
(
	{
		email: z.custom
		(
			isEmail,
			{
				message: 'Invalid email'
			}
		)
	}
);

export const SigninWithPhoneSchema = PasswordSchema.extend
(
	{
		phone: z.custom
		(
			isMobilePhone,
			{
				message: 'Invalid phone number'
			}
		)
	}
);