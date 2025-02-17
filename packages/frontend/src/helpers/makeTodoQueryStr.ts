import { TodoSearchParams } from '~shared/interfaces/todo.interface';

export const makeTodoQueryStr = ({
	title,
	isPublic,
	status,
	page,
	take,
}: TodoSearchParams): string => {
	const queryParams: string[] = [];

	if (title) queryParams.push(`search=${title}`);

	if (isPublic) queryParams.push(`isPublic=${isPublic}`);

	if (status) queryParams.push(`status=${status}`);

	if (page) queryParams.push(`page=${page}`);

	if (take) queryParams.push(`take=${take}`);

	return queryParams.length ? `?${queryParams.join('&')}` : '';
};
