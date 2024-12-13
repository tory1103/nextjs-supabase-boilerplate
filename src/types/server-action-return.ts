import { TError } from '@/types/error';


export type ServerActionReturn<T, K extends Record<string, string>> =
	{
		success: true;
		data: T
	} | {
		success: false;
		error: TError<K>
	}