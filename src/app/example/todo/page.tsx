"use client";

import React from "react";
import { Card } from "@/components/atoms";
import { useTodos } from '@/hooks/todo/useTodos';
import Link from "next/link";
import { useMasterData } from "@/contexts/MasterDataContext";

const TodoPage = React.memo(() => {
    const { data, loading, error } = useTodos();
    const masterData = useMasterData();

    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>エラーが発生しました: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            {data ? data.map((todo) => (
                <Card key={todo.id} title={todo.title} className="mb-4">
                    <p className="text-gray-600 mb-2">{todo.body}</p>
                    <div className="text-sm text-gray-500">
                        <p>作成日: {new Date(todo.createdAt).toLocaleDateString('ja-JP')}</p>
                        <p>更新日: {new Date(todo.updatedAt).toLocaleDateString('ja-JP')}</p>
                    </div>
                </Card>
            )) : <div>データがありません</div>}
            <div className="text-center">
                <Link href="/">HOMEへ</Link>
            </div>
            <div className="text-center">
                <Link href="/example">EXAMPLEへ</Link>
            </div>
        </div>
    );
});

TodoPage.displayName = 'TodoPage';

export default TodoPage;
