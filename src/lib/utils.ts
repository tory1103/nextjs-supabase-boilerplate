import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isStrongPassword } from 'validator';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isValidPassword(password: string) {
	return isStrongPassword(password, { minLength: 8, minNumbers: 1, minUppercase: 1, minLowercase: 1, minSymbols: 1 });
}
