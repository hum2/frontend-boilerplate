"use client";

import { useState, useEffect, useCallback } from 'react';
import { exampleApiClient } from '@/lib/api/example';

/**
 * Todo API使用例
 *
 * エンドポイントごとに異なるレスポンス型を指定する具体例
 */

// Todo関連の型定義
export interface TodoResponse {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
}

export interface TodoListResponse {
    todos: TodoResponse[];
}

export interface CreateTodoRequest {
    title: string;
    body: string;
}

export interface UpdateTodoRequest extends Partial<CreateTodoRequest> {
    completed?: boolean;
}

// Todo一覧取得フック
export const useTodos = () => {
    const [data, setData] = useState<TodoResponse[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // 型パラメータでレスポンス型を指定
            const result = await exampleApiClient.get<TodoResponse[]>('/api/todo');
            // APIレスポンスから todos 配列を取り出す
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return {
        data,
        loading,
        error,
        refetch: fetchTodos,
    };
};

// Todo詳細取得フック
export const useTodo = (id: string) => {
    const [data, setData] = useState<TodoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTodo = useCallback(async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);

            // 具体的なTodo型を指定
            const result = await exampleApiClient.get<TodoResponse>(`/todos/${id}`);
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchTodo();
    }, [fetchTodo]);

    return {
        data,
        loading,
        error,
        refetch: fetchTodo,
    };
};

// Todo操作フック
export const useTodoActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const executeAction = async <T>(action: () => Promise<T>): Promise<T | null> => {
        try {
            setLoading(true);
            setError(null);
            const result = await action();
            return result;
        } catch (err) {
            setError(err as Error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // 作成: TodoResponseを返す
    const create = (data: CreateTodoRequest) =>
        executeAction(() => exampleApiClient.post<TodoResponse>('/todos', data));

    // 更新: TodoResponseを返す
    const update = (id: string, data: UpdateTodoRequest) =>
        executeAction(() => exampleApiClient.put<TodoResponse>(`/todos/${id}`, data));

    // 完了状態の切り替え: TodoResponseを返す
    const toggleComplete = (id: string, completed: boolean) =>
        executeAction(() => exampleApiClient.patch<TodoResponse>(`/todos/${id}/complete`, { completed }));

    // 削除: レスポンスボディなし
    const remove = (id: string) =>
        executeAction(() => exampleApiClient.delete<void>(`/todos/${id}`));

    // 一括削除: レスポンスボディなし
    const bulkDelete = (ids: string[]) =>
        executeAction(() => exampleApiClient.delete<void>('/todos/bulk', { data: { ids } }));

    return {
        loading,
        error,
        create,
        update,
        toggleComplete,
        remove,
        bulkDelete,
    };
};
