import { Todo } from "@/domain/todo/todo";
import { TodoRepository } from "@/domain/todo/todo_repository";
// import { createExampleClient } from "@/lib/api/example";
// import { fetchApi } from "@/lib/api/fetchApi";

const API_URL = "https://68245eb465ba05803399fbe5.mockapi.io/api/todo";

interface TodoResponse {
    id: number;
    title: string;
    body: string;
}

export class TodoRepositoryImpl implements TodoRepository {
    fetchTodos(): Promise<Todo[]> {
        try {
            return Promise.resolve([]);
            // return fetchApi<TodoResponse[]>(API_URL).then((response) => {
            //     return response.data.map((todo) => new Todo({
            //         id: todo.id,
            //         title: todo.title,
            //         body: todo.body
            //     }));
            // })
        } catch (error) {
            console.error("Error fetching TODOs:", error);
            throw error;
        }
    }
}
