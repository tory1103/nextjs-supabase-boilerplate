import { z } from 'zod';

import {
	SigninWithEmailSchema,
	SigninWithPhoneSchema
}            from '@/zod-schemas/auth/signin';
import {
	SignupWithEmailSchema,
	SignupWithPhoneSchema
}            from '@/zod-schemas/auth/signup';


export type SigninWithEmail = z.infer<typeof SigninWithEmailSchema>
export type SigninWithPhone = z.infer<typeof SigninWithPhoneSchema>;

export type SignupWithEmail = z.infer<typeof SignupWithEmailSchema>;
export type SignupWithPhone = z.infer<typeof SignupWithPhoneSchema>;