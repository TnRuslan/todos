export type TodoType = {
	data: string;
};

export type TodoQueryParams = {
	isPublic?: boolean;
	status?: boolean;
	search?: string;
	skip: number;
	take: number;
};
