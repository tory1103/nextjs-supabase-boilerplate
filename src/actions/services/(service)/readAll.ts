// 'use server';
//
// import { fallbackRedirect, withGuards } from '@/lib';
// import { QKEYS_USERS } from '@/lib/queryClient';
// import { usersService } from '@/services';
// import { type ServerActionReturnPromise, type ServiceOutput } from '@/types';
//
// type Action = typeof usersService.readAll;
//
// type Output = ServiceOutput<Action>;
//
// type Error = unknown;
//
// const SCOPE = QKEYS_USERS.getScope()[0];
//
// const handler = async (): ServerActionReturnPromise<Output, Error> => {
// 	return {
// 		success: true,
// 		data: await usersService.readAll(),
// 	};
// };
//
// export const usersReadAllAction = async (): Promise<Output> => {
// 	const handlerWithGuards = await withGuards(handler, fallbackRedirect);
//
// 	const guards = await handlerWithGuards();
// 	if (!guards.success) {
// 		throw new Error(`ERROR: ReadAll ${SCOPE} guards`);
// 	}
//
// 	if (!guards.data.success) {
// 		throw new Error(`[${guards.data.error.code}] ${guards.data.error.message}`);
// 	}
//
// 	return guards.data.data;
// };
