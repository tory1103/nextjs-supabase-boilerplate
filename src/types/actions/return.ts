import { type TError } from '@/types';

export type ServerActionReturn<T, K> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: TError<K>;
	  };

export type ServerActionReturnPromise<T, K> = Promise<ServerActionReturn<T, K>>;
