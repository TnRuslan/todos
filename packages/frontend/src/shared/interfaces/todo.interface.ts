export interface BaseResponse<T extends ITodo | ITodo[]> {
	code: number;
	data: T;
	count?: number;
	message?: string;
}

export interface ITodo {
	id: number;
	title: string;
	description: string;
	public: boolean;
	completed: boolean;
	userId: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface ICreateTodo {
	title?: string;
	description?: string;
	public?: boolean;
	completed?: boolean;
}

export interface TodoSearchParams {
	title?: string;
	status?: boolean;
	isPublic?: boolean;
	page?: number;
	take?: number;
}
