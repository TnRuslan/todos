import React, { useCallback, useEffect, useRef, useState } from 'react';

import TodoList from '~shared/components/todo-list/todoList.component';
import { useTodoStore } from '~store/todo.store';
import {
	dashboardTitle,
	dashboardWrapper,
	paginationContainer,
} from './dashboard.styles';
import { PlusIcon } from '~assets/plusIcon';
import IconButton from '~shared/components/icon-button/iconButton.component';
import { Button, ButtonGroup, Dialog } from '@blueprintjs/core';
import CreateTodo from '~shared/components/create-todo-form/CreateTodoForm';
import { dialogStyles } from '~shared/styles/common-styles';
import TodoFilter from '~shared/components/todo-filter/todoFilter.component';
import { useMediaQuery } from 'react-responsive';
import { THEME } from '~shared/styles/theme';
import { useTodoFilters } from '~shared/hooks/useTodoFilters';

const DashboardPage = (): React.ReactNode => {
	const { todos, getAllTodo, todosCount } = useTodoStore();
	const [isOpen, setIsOpen] = useState(false);
	const { page, take, title, isPublic, status, setFilters } = useTodoFilters();

	const isAppendTodos = useMediaQuery({
		maxWidth: THEME.BREAKPOINTS.DESKTOP,
	});

	const isMobile = useMediaQuery({ maxWidth: THEME.BREAKPOINTS.TABLET });

	const totalPages = Math.ceil(todosCount / take);

	const handleButtonClick = useCallback(() => setIsOpen(!isOpen), [isOpen]);

	const handleClose = useCallback(() => setIsOpen(false), []);

	const observerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		getAllTodo({ page, take, title, isPublic, status }, isAppendTodos);
	}, [page]);

	useEffect(() => {
		if (!isAppendTodos || totalPages <= 1 || page === totalPages) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setFilters({ page: page + 1 });
				}
			},
			{ threshold: 1.0 },
		);

		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			if (observerRef.current) {
				observer.unobserve(observerRef.current);
			}
		};
	}, [isAppendTodos, page, totalPages]);

	return (
		<div className={dashboardWrapper}>
			<h1 className={dashboardTitle}>My Todos</h1>
			<TodoFilter />
			<IconButton
				onClick={handleButtonClick}
				icon={<PlusIcon size={30} color={THEME.COLORS.primaryText} />}
			/>
			<Dialog isOpen={isOpen} onClose={handleClose} className={dialogStyles}>
				<CreateTodo onClose={handleClose} />
			</Dialog>
			<TodoList todos={todos} />

			{isMobile && totalPages > 1 && <div ref={observerRef} />}

			{!isMobile && totalPages > 1 && (
				<div className={paginationContainer}>
					{isAppendTodos ? (
						<Button
							onClick={() => setFilters({ page: page + 1 })}
							disabled={page === totalPages}
						>
							Load more
						</Button>
					) : (
						<ButtonGroup>
							{[...Array(totalPages)].map((_, i) => (
								<Button
									key={i}
									onClick={() => setFilters({ page: i + 1 })}
									active={page === i + 1}
								>
									{i + 1}
								</Button>
							))}
						</ButtonGroup>
					)}
				</div>
			)}
		</div>
	);
};

export default DashboardPage;
