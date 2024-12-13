import { isStrongPassword } from 'validator';


export function isValidPassword( password: string )
{
	return isStrongPassword( password, { minLength: 8, minNumbers: 1, minUppercase: 1, minLowercase: 1, minSymbols: 1 } );
}