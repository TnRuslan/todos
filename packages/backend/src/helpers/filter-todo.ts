import { TodoQueryParams } from '@/types/todos.type';
import { Prisma } from '@prisma/client';

export const filterTodo = (
	params: TodoQueryParams,
	userId: number,
): Prisma.TodoWhereInput => {
	return {
		AND: [
			{
				title: {
					contains: params.search,
					mode: 'insensitive',
				},
			},
			{ completed: params.status },
			{ public: params.isPublic },
			{
				OR: [{ userId: userId }, { public: true }],
			},
		],
	};
};
