import TodoForm from '~shared/components/todo-form/todoForm.component';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ICreateTodo } from '~shared/interfaces/todo.interface';
import { useTodoStore } from '~store/todo.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTodoSchema } from '~shared/schemas/todo.schema';

interface CreateTodoProps {
	onClose: () => void;
}

const CreateTodo = ({ onClose }: CreateTodoProps): React.ReactNode => {
	const { createTodo } = useTodoStore();
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ICreateTodo>({
		resolver: yupResolver(createTodoSchema),
	});

	const onSubmit = (data: ICreateTodo): void => {
		createTodo(data);
		reset();
		onClose();
	};

	return (
		<div>
			<TodoForm
				title="Create a new todo"
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				register={register}
				errors={errors}
			/>
		</div>
	);
};

export default CreateTodo;
