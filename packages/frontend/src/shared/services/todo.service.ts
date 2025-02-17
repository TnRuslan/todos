import { AxiosResponse } from 'axios';

import HttpServices from './http.service';
import {
	BaseResponse,
	ICreateTodo,
	ITodo,
	TodoSearchParams,
} from '~shared/interfaces/todo.interface';
import { makeTodoQueryStr } from '~/helpers/makeTodoQueryStr';

class TodoService extends HttpServices {
	constructor() {
		super();
	}

	async getAllTodos(
		searchParams: TodoSearchParams,
	): Promise<AxiosResponse<BaseResponse<ITodo[]>>> {
		return this.get(
			{
				url: `all${makeTodoQueryStr(searchParams)}`,
			},
			true,
		);
	}

	async getTodoById(id: string): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.get({ url: id }, true);
	}

	async createTodo(
		todo: ICreateTodo,
	): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.post({ url: '', data: todo }, true);
	}

	async updateTodo(
		id: string,
		data: Partial<ICreateTodo>,
	): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.patch({ url: id, data }, true);
	}

	async deleteTodo(id: string): Promise<AxiosResponse<BaseResponse<ITodo>>> {
		return this.delete({ url: id }, true);
	}
}

export default TodoService;
