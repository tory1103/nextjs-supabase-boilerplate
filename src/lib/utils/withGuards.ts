'use server';

import { type Guard, type GuardedReturn } from '@/types';

export const withGuards = async <T extends unknown[], K, L>(
	guardedFn: (...args: T) => Promise<K>,
	fallbackFn: () => Promise<L>,
	...guards: Guard[]
): Promise<(...args: T) => Promise<GuardedReturn<K, L>>> => {
	return async (...args: T): Promise<GuardedReturn<K, L>> => {
		for (const guard of guards) {
			if (!(await guard())) {
				return {
					success: false,
					data: await fallbackFn(),
				};
			}
		}

		return {
			success: true,
			data: await guardedFn(...args),
		};
	};
};
