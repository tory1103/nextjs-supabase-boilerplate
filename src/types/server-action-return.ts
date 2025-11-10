import { type TError } from '@/types/error';

export type ServerActionReturn<T, K> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: TError<K>;
	  };
