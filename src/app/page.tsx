import { getServerContainer } from "@/di/server";
import HomeClient from "./HomeClient";

export default async function Home() {
    const container = getServerContainer();
    const todoRepository = container.todoRepository;
    const todos = await todoRepository.fetchTodos();
    // クラスインスタンスではなくプレーンなオブジェクトに変換
    const plainTodos = todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        body: todo.body,
    }));
    return <HomeClient initialTodos={plainTodos} />;
}
