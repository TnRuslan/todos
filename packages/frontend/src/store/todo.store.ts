import type { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ERROR_MESSAGES } from '~shared/constants/errorMessages';
import type {
  ICreateTodo,
  ITodo,
  TodoSearchParams,
} from '~shared/interfaces/todo.interface';
import { STORAGE_KEYS } from '~shared/keys';
import TodoService from '~shared/services/todo.service';

interface ITodoStore {
  todo: ITodo;
  todos: ITodo[];
  todosCount: number;
  loading: boolean;
  error: AxiosError | null;
  getAllTodo: (searchParams: TodoSearchParams, add?: boolean) => Promise<void>;
  getTodoById: (id: string) => Promise<void>;
  createTodo: (body: ICreateTodo) => Promise<void>;
  updateTodo: (id: string, body: Partial<ICreateTodo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const todoService = new TodoService();

export const useTodoStore = create<ITodoStore>()(
  persist(
    (set) => ({
      todos: [],
      todo: null,
      loading: false,
      error: null,
      todosCount: null,

      getAllTodo: async (searchParams, add = false): Promise<void> => {
        set({ loading: true });

        try {
          const { data } = await todoService.getAllTodos(searchParams);

          set((state) => ({
            todos: add ? [...state.todos, ...data.data] : data.data,
            todosCount: data.count,
            loading: false,
            error: null,
          }));
        } catch (error) {
          enqueueSnackbar(ERROR_MESSAGES.NOT_FOUND, {
            variant: 'error',
          });
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      getTodoById: async (id: string): Promise<void> => {
        set({ loading: true });

        try {
          const { data } = await todoService.getTodoById(id);

          set({
            todo: data.data,
            loading: false,
            error: null,
          });
        } catch (error) {
          enqueueSnackbar(ERROR_MESSAGES.NOT_FOUND, {
            variant: 'error',
          });
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      createTodo: async (todo: ICreateTodo): Promise<void> => {
        set({ loading: true });

        try {
          await todoService.createTodo(todo);
          const { data: all } = await todoService.getAllTodos({
            page: 1,
            take: 5,
          });

          set(() => ({
            todos: all.data,
            loading: false,
            error: null,
          }));
        } catch (error) {
          enqueueSnackbar(ERROR_MESSAGES.WRONG, {
            variant: 'error',
          });
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      updateTodo: async (
        id: string,
        body: Partial<ICreateTodo>,
      ): Promise<void> => {
        set({ loading: true });

        try {
          const { data } = await todoService.updateTodo(id, body);

          set((state) => ({
            todo: state.todo?.id === data.data.id ? data.data : state.todo,
            todos: state.todos.map((todo) =>
              todo.id === data.data.id ? data.data : todo,
            ),
            loading: false,
            error: null,
          }));
        } catch (error) {
          enqueueSnackbar(ERROR_MESSAGES.WRONG, {
            variant: 'error',
          });
          set({
            error: error.message,
            loading: false,
          });
        }
      },

      deleteTodo: async (id: string): Promise<void> => {
        set({
          loading: true,
        });

        try {
          await todoService.deleteTodo(id);

          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== Number(id)),
            loading: false,
            error: null,
          }));
        } catch (error) {
          enqueueSnackbar(ERROR_MESSAGES.NOT_FOUND, {
            variant: 'error',
          });
          set({
            error: error.message,
            loading: false,
          });
        }
      },
    }),
    {
      name: STORAGE_KEYS.TODO_STORE,
      partialize: (state) => ({ todo: state.todo }),
    },
  ),
);
