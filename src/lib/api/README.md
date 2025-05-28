# API クライアント設計ガイド

## 概要

このプロジェクトでは、**外部APIごとにディレクトリを分割**し、**汎用的なfactoryメソッド**を使用してaxiosインスタンスを作成する設計パターンを採用しています。

## ディレクトリ構成

```
src/lib/api/
├── core/                    # 汎用的なHTTPクライアントとファクトリー
│   ├── HttpClient.ts       # 汎用HTTPクライアントクラス
│   ├── factory.ts          # 汎用ファクトリーメソッド
│   └── index.ts           # エクスポート統合
├── example/                # 外部API例
│   ├── config.ts          # 外部API設定
│   ├── client.ts          # 外部APIクライアント
│   └── index.ts           # エクスポート統合
└── types.ts               # 共通型定義
```

## 設計原則

### ✅ **関心の分離**
- `core`: 汎用的なHTTP通信機能
- 各APIディレクトリ: 特定の外部API専用の設定とクライアント

### ✅ **ファクトリーパターン**
- `createApiClient`: 汎用的なAPIクライアント作成
- `createConfigFromEnv`: 環境変数ベースの設定作成
- `createServiceClient`: サービス名ベースのクライアント作成

### ✅ **型安全性**
- TypeScriptによる完全な型定義
- 各APIごとの専用型定義

## 使用方法

### 1. 新しい外部APIの追加

#### ステップ1: ディレクトリ作成
```bash
mkdir src/lib/api/newapi
```

#### ステップ2: 設定ファイル作成
```typescript
// src/lib/api/newapi/config.ts
import { type ApiConfig } from '../core';

export const newApiConfig: ApiConfig = {
    baseURL: process.env.NEXT_PUBLIC_NEW_API_BASE_URL || 'https://api.newservice.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    auth: {
        type: 'bearer',
        token: process.env.NEXT_PUBLIC_NEW_API_TOKEN,
    },
};
```

#### ステップ3: クライアント作成
```typescript
// src/lib/api/newapi/client.ts
import { createApiClient } from '../core';
import { newApiConfig } from './config';

export const createNewApiClient = () => {
    return createApiClient(newApiConfig);
};

export const newApiClient = createNewApiClient();
```

#### ステップ4: エクスポート統合
```typescript
// src/lib/api/newapi/index.ts
export { newApiClient, createNewApiClient } from './client';
export { newApiConfig } from './config';
export type * from './types'; // 型定義がある場合
```

### 2. hooksでの使用

```typescript
// src/hooks/useNewApi.ts
import { useState, useEffect, useCallback } from 'react';
import { newApiClient } from '@/lib/api/newapi';

// レスポンス型定義
interface NewApiDataResponse {
    id: string;
    name: string;
    value: number;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

export const useNewApiData = () => {
    const [data, setData] = useState<NewApiDataResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // 型パラメータでレスポンス型を指定
            const result = await newApiClient.get<NewApiDataResponse>('/data');
            setData(result);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};
```

## 環境変数設定

### 基本パターン
```env
# .env.local
NEXT_PUBLIC_EXAMPLE_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_EXAMPLE_API_KEY=your-api-key
```

### Example API認証設定（Bearer認証固定）
```env
# Bearer Token認証
NEXT_PUBLIC_EXAMPLE_API_AUTH_TOKEN=your-bearer-token
```

### 使用例
```typescript
import { exampleApiClient } from '@/lib/api/example';

// Bearer認証ヘッダーは環境変数の設定に基づいて自動的に追加される
const data = await exampleApiClient.get<SomeType>('/api/endpoint');
```

## コア機能

### HttpClient クラス

汎用的なHTTPクライアントクラスで、以下の機能を提供：

- **認証**: Bearer認証対応
- **リトライ**: 5xxエラーとネットワークエラーの自動リトライ
- **ログ**: リクエスト/レスポンスの詳細ログ
- **エラーハンドリング**: 統一されたエラー形式

### ファクトリーメソッド

#### `createApiClient(config: ApiConfig)`
基本的なAPIクライアント作成メソッド

#### `createConfigFromEnv(envPrefix: string)`
環境変数から設定を自動生成

#### `createServiceClient(serviceName: string)`
サービス名から設定を自動生成

## 実装例

### 外部API
```typescript
import { exampleApiClient } from '@/lib/api/example';

// 型定義
interface Item {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

interface ItemListResponse {
    items: Item[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

// データ取得（型安全）
const items = await exampleApiClient.get<ItemListResponse>('/items');

// データ作成（型安全）
const newItem = await exampleApiClient.post<Item>('/items', {
    name: 'New Item',
    description: 'Description',
    price: 1000,
    category: 'electronics'
});
```

## ベストプラクティス

### ✅ **推奨パターン**

1. **ドメインごとの分離**
   - 各外部APIごとに専用ディレクトリ
   - 設定、クライアント、型定義の分離

2. **環境変数の活用**
   - 設定値のハードコーディング回避
   - 環境ごとの柔軟な設定

3. **型安全性の確保**
   - 完全なTypeScript型定義
   - APIレスポンスの型定義

4. **エラーハンドリング**
   - 統一されたエラー処理
   - 適切なリトライ機能

### ⚠️ **避けるべきパターン**

1. **巨大な設定ファイル**
   - 複数APIの設定を1つのファイルに混在

2. **ハードコーディング**
   - URLやAPIキーの直接記述

3. **型定義の欠如**
   - any型の多用

## まとめ

この設計により以下を実現：

- **保守性**: 外部APIごとの独立した管理
- **再利用性**: 汎用ファクトリーメソッドの活用
- **型安全性**: 完全なTypeScript対応
- **拡張性**: 新しいAPIの簡単な追加
- **テスタビリティ**: 独立したテストが可能

中〜大規模なプロジェクトで特に効果を発揮し、長期的な保守性を大幅に向上させます。

## 型安全なAPIクライアントの使用

### 基本的な型パラメータの使用

すべてのHTTPメソッドはジェネリック型パラメータをサポートしており、エンドポイントごとに異なるレスポンス型を指定できます：

```typescript
// Todo APIの例
interface TodoResponse {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
}

interface TodoListResponse {
    todos: TodoResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

// 型安全なAPIリクエスト
const todo = await newApiClient.get<TodoResponse>('/todo/123');
const todoList = await newApiClient.get<TodoListResponse>('/todos');

// POST/PUT/PATCH/DELETEメソッドでも型指定可能
const newTodo = await newApiClient.post<TodoResponse>('/todos', {
    title: 'New Task',
    description: 'Task description'
});

const updatedTodo = await newApiClient.put<TodoResponse>('/todos/123', {
    completed: true
});

// void型の場合（レスポンスボディなし）
await newApiClient.delete<void>('/todos/123');
```

### hooksでの型安全な使用

```typescript
// カスタムフックでの型パラメータ使用例
export const useTodos = () => {
    const [todos, setTodos] = useState<TodoResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            // 型パラメータでレスポンス型を指定
            const result = await exampleApiClient.get<TodoListResponse>('/todos');
            setTodos(result.todos);
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createTodo = useCallback(async (todoData: Partial<TodoResponse>) => {
        // 作成APIも型安全
        const newTodo = await exampleApiClient.post<TodoResponse>('/todos', todoData);
        setTodos(prev => [...prev, newTodo]);
        return newTodo;
    }, []);

    return { todos, loading, fetchTodos, createTodo };
};
```

### 複雑なレスポンス型の例

```typescript
// ページネーション付きレスポンス
interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    meta: {
        filters: Record<string, any>;
        sort: string;
    };
}

// 使用例
const users = await apiClient.get<PaginatedResponse<User>>('/users?page=1&limit=10');
const items = await apiClient.get<PaginatedResponse<Item>>('/items?category=electronics');

// エラーレスポンス型
interface ApiErrorResponse {
    error: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
}

// 条件付きレスポンス型
type SearchResponse<T> = T extends 'users'
    ? PaginatedResponse<User>
    : T extends 'items'
    ? PaginatedResponse<Item>
    : unknown;
```

### 実用例：既存hooksでの使用パターン

```typescript
// ユーザー管理API
interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'guest';
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt: string;
}

interface UserListResponse {
    users: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// 実際の使用例
export const useUsers = (params?: UserListParams) => {
    // ... state definitions

    const fetchUsers = useCallback(async () => {
        const result = await exampleApiClient.get<UserListResponse>(url);
        setData(result);
    }, [params]);

    // 各操作でも型を指定
    const create = (data: CreateUserRequest) =>
        executeAction(() => exampleApiClient.post<User>('/users', data));

    const update = (id: string, data: Partial<UpdateUserRequest>) =>
        executeAction(() => exampleApiClient.put<User>(`/users/${id}`, data));

    const remove = (id: string) =>
        executeAction(() => exampleApiClient.delete<void>(`/users/${id}`));

    return { data, loading, error, refetch: fetchUsers };
};

// アイテム管理API
export const useItems = (params?: ItemListParams) => {
    const fetchItems = useCallback(async () => {
        const result = await exampleApiClient.get<ItemListResponse>(url);
        setData(result);
    }, [params]);

    // 価格更新の例
    const updatePrice = (id: string, price: number) =>
        executeAction(() => exampleApiClient.patch<Item>(`/items/${id}/price`, { price }));

    // 一括更新の例（レスポンスなし）
    const bulkUpdateStatus = (ids: string[], status: Item['status']) =>
        executeAction(() => exampleApiClient.patch<void>('/items/bulk/status', { ids, status }));

    return { data, loading, error, refetch: fetchItems };
};

// サービス健康チェックAPI
export const useServiceActions = () => {
    // カスタムレスポンス型を持つAPI
    const checkHealth = (id: string) =>
        executeAction(() =>
            exampleApiClient.get<{ status: string; responseTime: number }>(`/services/${id}/health`)
        );

    return { checkHealth };
};
```

### 型パラメータのベストプラクティス

1. **明示的な型定義**: `any`を避け、具体的な型を定義する
2. **void型の使用**: レスポンスボディがない場合は`<void>`を指定
3. **ジェネリック型の活用**: 共通パターンは再利用可能な型として定義
4. **エラーハンドリング**: APIエラーレスポンスも型定義する

```typescript
// 推奨: 明示的な型定義
const user = await apiClient.get<User>('/users/123');

// 非推奨: any型（型安全性を失う）
const user = await apiClient.get('/users/123'); // 戻り値型がany
```

## 設計原則
