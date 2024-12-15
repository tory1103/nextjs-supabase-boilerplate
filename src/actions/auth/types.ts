import { z } from 'zod';

import {
	SignupWithEmailSchema,
	SignupWithPhoneSchema
}            from '@/zod-schemas/auth/signup';


export type SignWithEmail = {
	email: string;
	password: string;
}

export type SignWithPhone = {
	phone: string;
	password: string;
}

export type SignupWithEmail = z.infer<typeof SignupWithEmailSchema>;
export type SignupWithPhone = z.infer<typeof SignupWithPhoneSchema>;