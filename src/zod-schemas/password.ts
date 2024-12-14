import { isStrongPassword } from 'validator';
import { z }                from 'zod';


export const PasswordSchema = z.object
(
	{
		password: z.custom
		(
			isStrongPassword,
			{
				message: 'Must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 symbol'
			}
		)
	}
);