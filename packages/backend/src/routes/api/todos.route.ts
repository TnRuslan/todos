import todoController from '../../controllers/todo.controller';

import { jwtAuth } from '@/middleware/auth.middleware';
import { isExist } from '@/middleware/isExist.middleware';
import { tryCatchWrapper } from '@/middleware/tryCatch.middleware';
import { validateBody } from '@/middleware/validation.middleware';
import { todoSchema } from '@/utils/validation/todo.schema';
import { Router } from 'express';

const todosRouter: Router = Router();

todosRouter.get(
  '/all',
  jwtAuth,
  tryCatchWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
  '/:id',
  jwtAuth,
  isExist('todo'),
  tryCatchWrapper(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
  '/',
  jwtAuth,
  validateBody(todoSchema),
  tryCatchWrapper(todoController.createTodo.bind(todoController)),
);

todosRouter.patch(
  '/:id',
  jwtAuth,
  isExist('todo'),
  tryCatchWrapper(todoController.updateTodo.bind(todoController)),
);

todosRouter.delete(
  '/:id',
  jwtAuth,
  isExist('todo'),
  tryCatchWrapper(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
