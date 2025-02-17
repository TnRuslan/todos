import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TodoSearchParams } from '~shared/interfaces/todo.interface';
import Input from '../input/input.component';
import Form from '../form/form.component';
import { useTodoStore } from '~store/todo.store';
import { checkboxWrapper, filterWrapper, inputBox } from './todoFilter.styles';
import { useTodoFilters } from '~shared/hooks/useTodoFilters';

const TodoFilter = (): React.ReactNode => {
	const { title, isPublic, status, page, take, setFilters } =
		useTodoFilters();
	const { getAllTodo } = useTodoStore();
	const { handleSubmit } = useForm<TodoSearchParams>();

	const onSubmit = (data: TodoSearchParams): void => {
		getAllTodo(data);
	};

	useEffect(() => {
		getAllTodo({ title, isPublic, status, page, take });
	}, [title, isPublic, status, page, take]);

	return (
		<div className={filterWrapper}>
			<Form<TodoSearchParams>
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				submitBtnTitle="Search"
			>
				<div className={inputBox}>
					<Input
						placeholder="Todo title"
						label="Todo title"
						onChange={(e) => {
							setFilters({
								title: e.currentTarget.value,
								page: 1,
							});
						}}
						value={title}
					/>
					<div className={checkboxWrapper}>
						<Input
							label="Public"
							type="checkbox"
							inputSize={20}
							defaultChecked={isPublic}
							onChange={(e) => {
								setFilters({
									isPublic: e.currentTarget.checked,
									page: 1,
								});
							}}
						/>
						<Input
							label="Status"
							type="checkbox"
							inputSize={20}
							defaultChecked={status}
							onChange={(e) => {
								setFilters({
									status: e.currentTarget.checked,
									page: 1,
								});
							}}
						/>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default TodoFilter;
