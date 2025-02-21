import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';
import { StatusCodes } from '@/utils/const/statusCode';
import { User } from '@prisma/client';
import parseBoolean from '@/helpers/bulean-parser';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as User;

		const { isPublic, status, search = '', page = 1, take = 5 } = req.query;

		const pageNumber = Number(page);
		const takeNumber = Number(take);
		const skip = (pageNumber - 1) * takeNumber;

		const searchParams = {
			isPublic: parseBoolean(isPublic as string, true),
			status: parseBoolean(status as string, false),
			search: search as string,
			skip,
			take: takeNumber,
		};

		const { todos, count } = await this.todoService.findAll(user, searchParams);

		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
			data: todos,
			count,
		});
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = req.params.id;
		const todo = await this.todoService.findOne(Number(id));

		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
			data: todo,
		});
	}

	async createTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		const newTodo = await this.todoService.createTodo(user, req.body);

		res.status(StatusCodes.Created).json({
			code: StatusCodes.Created,
			data: newTodo,
		});
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		const updatedTodo = await this.todoService.updateTodo(
			req.body,
			Number(req.params.id),
			user,
		);

		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
			data: updatedTodo,
		});
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const user = req.user as User;
		await this.todoService.deleteTodo(Number(req.params.id), user);

		res.status(StatusCodes.OK).json({
			code: StatusCodes.OK,
		});
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
