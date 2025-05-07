import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import TodoForm from '~shared/components/todo-form/todoForm.component';
import type { ICreateTodo } from '~shared/interfaces/todo.interface';
import { ROUTER_KEYS } from '~shared/keys';
import { updateTodoSchema } from '~shared/schemas/todo.schema';
import type { IFile } from '~shared/services/file.service';
import fileService from '~shared/services/file.service';
import { useTodoStore } from '~store/todo.store';
import NotFoundPage from '../not-found/NotFoundPage';

const editTodoPage = (): React.ReactNode => {
  const { id } = useParams<{ id: string }>();
  const [files, setFiles] = useState<IFile[]>([]);
  const navigate = useNavigate();
  const { updateTodo, getTodoById, todo: selectedTodo } = useTodoStore();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ICreateTodo>({
    resolver: yupResolver(updateTodoSchema),
  });

  const fileInputRef = useRef(null);
  const progressRef = useRef(null);

  const onSubmit = (data: ICreateTodo): void => {
    navigate(ROUTER_KEYS.DASHBOARD);
    updateTodo(id, data);
    reset;
  };

  const fetchFiles = useCallback(async () => {
    const data = await fileService.getFileList();
    setFiles(data);
  }, []);

  useEffect(() => {
    getTodoById(id);
    fetchFiles();
  }, [id]);

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const file = files[0];

    const formData = new FormData();
    formData.append('file', file);

    fileService.uploadFile(formData, progressRef.current, fetchFiles);
    fileInputRef.current.value = null;
  };

  const onLinkClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    fileService.downloadFile(event.currentTarget.href, progressRef.current);
    event.preventDefault();
  };

  return (
    <div>
      {selectedTodo && (
        <TodoForm
          title="Edit todo"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          defaultValue={selectedTodo}
          register={register}
          errors={errors}
        />
      )}

      <input ref={fileInputRef} id="file" type="file" onChange={onChangeFile} />
      <progress hidden ref={progressRef} value="0" max={100} />

      {files?.length > 0 && (
        <ol>
          {files.map((file) => (
            <li key={file.file}>
              <a
                href={`${process.env.SERVER_URL}/files/${file.file}`}
                onClick={onLinkClick}
              >
                {file.file}
              </a>
            </li>
          ))}
        </ol>
      )}

      {!selectedTodo && <NotFoundPage />}
    </div>
  );
};

export default editTodoPage;
