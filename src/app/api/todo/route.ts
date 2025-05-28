import { NextRequest, NextResponse } from 'next/server';

// MockAPIの代替として、ダミーのTodoデータを返すAPI
export async function GET(request: NextRequest) {
    try {
        // useTodosが期待するTodoListResponse形式のレスポンス
        const todoListResponse = {
            todos: [
                {
                    id: '1',
                    title: 'Sample Todo 1',
                    body: 'This is the first todo item for testing',
                    createdAt: '2024-01-01T00:00:00Z',
                    updatedAt: '2024-01-01T00:00:00Z'
                },
                {
                    id: '2',
                    title: 'Sample Todo 2',
                    body: 'This is the second todo item for testing',
                    createdAt: '2024-01-02T00:00:00Z',
                    updatedAt: '2024-01-02T00:00:00Z'
                },
                {
                    id: '3',
                    title: 'Sample Todo 3',
                    body: 'This is the third todo item for testing',
                    createdAt: '2024-01-03T00:00:00Z',
                    updatedAt: '2024-01-03T00:00:00Z'
                }
            ]
        };

        return NextResponse.json(todoListResponse);
    } catch (error) {
        console.error('Todo API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch todos' },
            { status: 500 }
        );
    }
}
