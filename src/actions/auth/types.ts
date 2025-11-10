import { type z } from 'zod';

import { type SigninWithEmailSchema, type SigninWithPhoneSchema } from '@/zod-schemas/auth/signin';
import { type SignupWithEmailSchema, type SignupWithPhoneSchema } from '@/zod-schemas/auth/signup';

export type SigninWithEmail = z.infer<typeof SigninWithEmailSchema>;
export type SigninWithPhone = z.infer<typeof SigninWithPhoneSchema>;

export type SignupWithEmail = z.infer<typeof SignupWithEmailSchema>;
export type SignupWithPhone = z.infer<typeof SignupWithPhoneSchema>;
