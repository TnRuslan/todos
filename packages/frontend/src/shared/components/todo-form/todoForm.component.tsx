import React from 'react';
import {
	FieldErrors,
	UseFormHandleSubmit,
	UseFormRegister,
} from 'react-hook-form';
import { ICreateTodo } from '~shared/interfaces/todo.interface';
import Input from '../input/input.component';
import Textarea from '../textarea/textarea.component';
import Form from '../form/form.component';

interface ITodoForm {
	title: string;
	onSubmit: (data: ICreateTodo) => void;
	handleSubmit: UseFormHandleSubmit<ICreateTodo, undefined>;
	children?: React.ReactNode;
	defaultValue?: ICreateTodo;
	register: UseFormRegister<ICreateTodo>;
	errors: FieldErrors<ICreateTodo>;
}

const TodoForm = ({
	title,
	onSubmit,
	handleSubmit,
	defaultValue,
	register,
	children,
	errors,
}: ITodoForm): React.ReactNode => {
	return (
		<Form<ICreateTodo>
			title={title}
			onSubmit={onSubmit}
			handleSubmit={handleSubmit}
		>
			<Input
				placeholder="Title"
				label="Title"
				defaultValue={defaultValue?.title}
				{...register('title')}
				errorMessage={errors.title?.message}
			/>
			<Textarea
				placeholder="Description"
				label="Description"
				defaultValue={defaultValue?.description}
				{...register('description')}
				errorMessage={errors.description?.message}
			/>
			<Input
				label="Public"
				type="checkbox"
				defaultChecked={defaultValue?.public}
				inputSize={20}
				{...register('public')}
			/>
			<Input
				label="Completed"
				type="checkbox"
				defaultChecked={defaultValue?.completed}
				inputSize={20}
				{...register('completed')}
			/>
			{children}
		</Form>
	);
};

export default TodoForm;
