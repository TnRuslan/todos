import { filterTodo } from '@/helpers/filter-todo';
import { TodoQueryParams } from '@/types/todos.type';
import { Todo, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default class TodoService {
	async findAll(
		user: User,
		query: TodoQueryParams,
	): Promise<{ todos: Todo[]; count: number }> {
		const [todos, count] = await Promise.all([
			prisma.todo.findMany({
				where: filterTodo(query, user.id),
				skip: query.skip,
				take: query.take,
				orderBy: {
					updatedAt: 'desc',
				},
			}),
			prisma.todo.count({ where: filterTodo(query, user.id) }),
		]);

		return { todos, count };
	}

	async findOne(id: number): Promise<Todo | null> {
		return await prisma.todo.findUnique({ where: { id } });
	}

	async createTodo(user: User, body: Todo): Promise<Todo> {
		return await prisma.todo.create({
			data: { ...body, userId: user.id },
		});
	}

	async updateTodo(
		body: Partial<Todo>,
		id: number,
		user: User,
	): Promise<Todo> {
		return await prisma.todo.update({
			where: { id, userId: user.id },
			data: body,
		});
	}

	async deleteTodo(id: number, user: User): Promise<Todo> {
		return prisma.todo.delete({ where: { id, userId: user.id } });
	}
}
