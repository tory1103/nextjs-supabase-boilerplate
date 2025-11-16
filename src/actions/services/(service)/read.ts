// 'use server';
//
// import { fallbackRedirect, guardIsValidUUID, withGuards } from '@/lib';
// import { QKEYS_USERS } from '@/lib/queryClient';
// import { usersService } from '@/services';
// import { type ServerActionReturnPromise, type ServiceArgs, type ServiceOutput } from '@/types';
//
// type Action = typeof usersService.read;
//
// type Input = ServiceArgs<Action>;
// type Output = ServiceOutput<Action>;
//
// type Error = unknown;
//
// const SCOPE = QKEYS_USERS.getScope()[0];
//
// const handler = async (...args: Input): ServerActionReturnPromise<Output, Error> => {
// 	const [data] = args;
//
// 	return {
// 		success: true,
// 		data: await usersService.read(data),
// 	};
// };
//
// export const usersReadAction = async (...args: Input): Promise<Output> => {
// 	const handlerWithGuards = await withGuards(handler, fallbackRedirect, guardIsValidUUID(args[0]));
//
// 	const guards = await handlerWithGuards(...args);
// 	if (!guards.success) {
// 		throw new Error(`ERROR: Read ${SCOPE} guards`);
// 	}
//
// 	if (!guards.data.success) {
// 		throw new Error(`[${guards.data.error.code}] ${guards.data.error.message}`);
// 	}
//
// 	return guards.data.data;
// };
