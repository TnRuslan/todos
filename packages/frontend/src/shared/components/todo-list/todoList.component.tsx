import React from 'react';
import { ITodo } from '~shared/interfaces/todo.interface';
import TodoItem from '../todo-item/todoItem.component';
import { todoListStyles } from './todoList.styles';
import { useMediaQuery } from 'react-responsive';
import { THEME } from '~shared/styles/theme';
import TodoSlider from '../todo-slider/todoSlider.component';

interface ITodoList {
	todos: ITodo[];
}

const TodoList = ({ todos }: ITodoList): React.ReactNode => {
	const isTablet = useMediaQuery({
		minWidth: THEME.BREAKPOINTS.TABLET,
		maxWidth: THEME.BREAKPOINTS.DESKTOP,
	});

	return (
		<div>
			{isTablet ? (
				<TodoSlider todos={todos} />
			) : (
				<ul className={todoListStyles}>
					{todos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			)}
		</div>
	);
};

export default TodoList;
