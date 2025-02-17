import { Button, Card, Checkbox, Elevation } from '@blueprintjs/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ITodo } from '~shared/interfaces/todo.interface';
import { useTodoStore } from '~store/todo.store';
import { todoBox, todoButtonsBox, todoDescription } from './todoItem.styles';
import { useAuthStore } from '~store/auth.store';

interface ITodoItem {
	todo: ITodo;
}

const TodoItem = ({ todo }: ITodoItem): React.ReactNode => {
	const navigate = useNavigate();
	const { user } = useAuthStore();
	const { deleteTodo } = useTodoStore();
	const { id, title, description, userId } = todo;

	const openEdit = (): void => {
		navigate(`edit/${id}`);
	};

	const onDeleteTodo = (): void => {
		deleteTodo(`${id}`);
	};

	return (
		<Card className={todoBox} elevation={Elevation.THREE}>
			<h3>{title}</h3>
			<p className={todoDescription}>{description ? description : '-'}</p>
			<div className={todoButtonsBox}>
				<Checkbox label="Public" defaultChecked={todo.public} />
				<Checkbox label="Completed" defaultChecked={todo.completed} />
			</div>

			<div className={todoButtonsBox}>
				<Button
					onClick={openEdit}
					disabled={user.id !== userId}
					style={{ minWidth: '100px' }}
				>
					Edit
				</Button>
				<Button
					onClick={onDeleteTodo}
					disabled={user.id !== userId}
					style={{ minWidth: '100px' }}
					intent="danger"
				>
					Delete
				</Button>
			</div>
		</Card>
	);
};

export default TodoItem;
