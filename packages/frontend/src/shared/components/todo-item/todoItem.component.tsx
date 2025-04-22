import { Card, Checkbox, Elevation } from '@blueprintjs/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ITodo } from '~shared/interfaces/todo.interface';
import { useAuthStore } from '~store/auth.store';
import { useTodoStore } from '~store/todo.store';
import Button from '../button/button.component';
import { Title } from '../title/title.component';
import { todoBox, todoButtonsBox, todoDescription } from './todoItem.styles';

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
      <Title text={title}></Title>
      <p className={todoDescription}>{description ? description : '-'}</p>
      <div className={todoButtonsBox}>
        <Checkbox label="Public" defaultChecked={todo.public} />
        <Checkbox label="Completed" defaultChecked={todo.completed} />
      </div>

      <div className={todoButtonsBox}>
        <Button
          onClick={openEdit}
          disabled={user.id !== userId}
          text="Edit"
        />

        <Button
          onClick={onDeleteTodo}
          disabled={user.id !== userId}
          text="Delete"
        />
      </div>
    </Card>
  );
};

export default TodoItem;
