import { TodoRepository } from '../domain/todo/todo_repository';
import { TodoRepositoryImpl } from '@/infrastructure/api/todo/todo_repository_impl';

export const createContainer = () => {
    const todoRepository: TodoRepository = new TodoRepositoryImpl();

    return {
        todoRepository,
    };
};

export type DIContainer = ReturnType<typeof createContainer>;
