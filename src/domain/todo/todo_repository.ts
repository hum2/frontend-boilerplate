import { Todo } from "./todo";

export interface TodoRepository {
    fetchTodos(): Promise<Todo[]>;
}
