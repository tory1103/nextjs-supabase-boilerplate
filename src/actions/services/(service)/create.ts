// 'use server';
//
// import { fallbackRedirect, withGuards } from '@/lib';
// import { QKEYS_USERS } from '@/lib/queryClient';
// import { usersService } from '@/services';
// import { type ServerActionReturnPromise, type ServiceArgs, type ServiceOutput } from '@/types';
// import { usersOptionalDefaultsSchema } from '@/zodSchemas/prismaSchemas/modelSchema/usersSchema';
//
// type Action = typeof usersService.create;
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
// 	const schema = await usersOptionalDefaultsSchema.safeParseAsync(data);
// 	if (!schema.success) {
// 		return {
// 			success: false,
// 			error: {
// 				code: `${SCOPE}-001`,
// 				message: `ERROR: Create data ${SCOPE}`,
// 			},
// 		};
// 	}
//
// 	return {
// 		success: true,
// 		data: await usersService.create(schema.data),
// 	};
// };
//
// export const usersCreateAction = async (...args: Input): Promise<Output> => {
// 	const handlerWithGuards = await withGuards(handler, fallbackRedirect);
//
// 	const guards = await handlerWithGuards(...args);
// 	if (!guards.success) {
// 		throw new Error(`ERROR: Create ${SCOPE} guards`);
// 	}
//
// 	if (!guards.data.success) {
// 		throw new Error(`[${guards.data.error.code}] ${guards.data.error.message}`);
// 	}
//
// 	return guards.data.data;
// };
