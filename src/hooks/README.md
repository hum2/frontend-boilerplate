# Hooks ディレクトリ

このディレクトリには、アプリケーション全体で使用されるカスタムフックが含まれています。

## ディレクトリ構成

```
src/hooks/
├── api/                    # API関連フック
│   ├── useTodos.ts        # Todo API フック
│   └── useMasterDataApi.ts # マスターデータAPI フック
├── use-mobile.tsx         # UI関連フック
└── README.md              # このファイル
```

## 設計原則

### 1. **関心の分離**
- **API関連**: `api/`ディレクトリに配置
- **UI関連**: ルート直下に配置
- **Context関連**: `src/contexts/`に配置

### 2. **命名規則**
- すべてのフックは`use`で始まる
- 機能を明確に表現する名前を使用
- API関連フックは`useXxxApi`または`useXxx`

### 3. **型安全性**
- すべてのフックでTypeScriptの型定義を使用
- APIレスポンスの型を明確に定義
- エラーハンドリングの型も適切に定義

## フック一覧

### API関連フック

#### `useTodos`
Todo APIとの通信を管理するフック

```typescript
const { data, loading, error, refetch } = useTodos();
```

#### `useMasterDataApi`
マスターデータAPIとの通信を管理するフック（クライアントサイド用）

```typescript
const { data, loading, error, refetch } = useMasterDataApi();
```

### UI関連フック

#### `useIsMobile`
モバイル表示の判定を行うフック

```typescript
const isMobile = useIsMobile();
```

## 使用例

### 基本的な使用方法

```typescript
import { useTodos } from '@/hooks/api/useTodos';

export const TodoList = () => {
    const { data, loading, error } = useTodos();

    if (loading) return <div>読み込み中...</div>;
    if (error) return <div>エラー: {error.message}</div>;

    return (
        <ul>
            {data?.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};
```

### エラーハンドリング

```typescript
import { useTodos } from '@/hooks/api/useTodos';

export const TodoListWithErrorHandling = () => {
    const { data, loading, error, refetch } = useTodos();

    const handleRetry = () => {
        refetch();
    };

    if (loading) return <div>読み込み中...</div>;

    if (error) {
        return (
            <div>
                <p>エラーが発生しました: {error.message}</p>
                <button onClick={handleRetry}>再試行</button>
            </div>
        );
    }

    return (
        <ul>
            {data?.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};
```

## ベストプラクティス

### ✅ **推奨パターン**

1. **単一責任の原則**
   - 1つのフックは1つの責任のみを持つ
   - 複雑な処理は複数のフックに分割

2. **型安全性の確保**
   - すべての戻り値に型定義
   - APIレスポンスの型を明確に定義

3. **エラーハンドリング**
   - 適切なエラー状態の管理
   - ユーザーフレンドリーなエラーメッセージ

4. **パフォーマンス最適化**
   - 必要に応じて`useCallback`、`useMemo`を使用
   - 不要な再レンダリングを防ぐ

### ⚠️ **避けるべきパターン**

1. **巨大なフック**
   - 複数の責任を持つフック
   - 100行を超える長大なフック

2. **型定義の欠如**
   - `any`型の多用
   - 戻り値の型が不明確

3. **副作用の乱用**
   - 不適切な`useEffect`の使用
   - 依存配列の不備

## 新しいフックの追加

新しいフックを追加する際は、以下の手順に従ってください：

1. **適切なディレクトリに配置**
   - API関連: `api/`ディレクトリ
   - UI関連: ルート直下

2. **型定義の作成**
   - インターフェースの定義
   - 戻り値の型定義

3. **テストの作成**
   - 基本的な動作テスト
   - エラーケースのテスト

4. **ドキュメントの更新**
   - このREADMEファイルの更新
   - 使用例の追加

## まとめ

このフック設計により以下を実現：

- **保守性**: 明確な責任分離と構造化
- **再利用性**: 汎用的なフックの設計
- **型安全性**: 完全なTypeScript対応
- **テスタビリティ**: 独立したテストが可能

適切なフック設計により、アプリケーションの品質と開発効率を大幅に向上させることができます。
