// import { type Prisma, type users } from '@/generated/prisma';
// import { PrismaClientSingleton } from '@/lib/prisma/client';
// import { AbstractSingleton, type Service } from '@/types';
//
// type CreateInput = Prisma.usersCreateInput | Prisma.usersUncheckedCreateInput;
// type UpdateInput = Prisma.usersUpdateInput | Prisma.usersUncheckedUpdateInput;
//
// type Input = CreateInput | UpdateInput;
// type Output = users;
//
// class UsersService extends AbstractSingleton implements Service<Input, Output> {
// 	create(data: CreateInput): Promise<Output> {
// 		return PrismaClientSingleton.users.create({
// 			data,
// 		});
// 	}
//
// 	delete(id: string): Promise<Output> {
// 		return PrismaClientSingleton.users.delete({
// 			where: { id },
// 		});
// 	}
//
// 	read(id: string): Promise<Output | null> {
// 		return PrismaClientSingleton.users.findUnique({
// 			where: { id },
// 		});
// 	}
//
// 	readAll(): Promise<Output[]> {
// 		return PrismaClientSingleton.users.findMany();
// 	}
//
// 	update(id: string, data: UpdateInput): Promise<Output> {
// 		return PrismaClientSingleton.users.update({
// 			where: { id },
// 			data,
// 		});
// 	}
// }
//
// export const usersService = UsersService.getInstance<UsersService>();
