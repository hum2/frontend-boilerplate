# カスタムフック設計ガイド

## 概要

このプロジェクトでは、**ドメインごとにhooksファイルを分割**する設計パターンを採用しています。これにより、関心の分離、保守性、テスタビリティを向上させています。

## ディレクトリ構成

```
src/hooks/
├── useUsers.ts          # ユーザー管理
├── useItems.ts          # アイテム管理
├── useServices.ts       # サービス管理
├── useOrders.ts         # 注文管理（例）
├── useNotifications.ts  # 通知管理（例）
└── README.md           # このファイル
```

## 設計原則

### ✅ **単一責任原則**
- 1つのhooksファイルは1つのドメインのみを担当
- 関連のない機能は別ファイルに分離

### ✅ **命名規則**
- ファイル名: `use{Domain}.ts` (例: `useUsers.ts`, `useItems.ts`)
- フック名: `use{Domain}`, `use{Domain}Actions` など

### ✅ **共通パターン**
各ドメインで以下の共通パターンを採用:

```typescript
// 一覧取得フック
export const useUsers = (params?: UserListParams) => {
    // 実装
};

// 詳細取得フック
export const useUser = (id: string) => {
    // 実装
};

// 操作フック
export const useUserActions = () => {
    // 実装
};
```

## 実装例

### ユーザー管理 (`useUsers.ts`)

```typescript
import { useUsers, useUser, useUserActions } from '@/hooks/useUsers';

// ユーザー一覧
const { data, loading, error, refetch } = useUsers({
    page: 1,
    limit: 10,
    role: 'admin'
});

// ユーザー詳細
const { data: user } = useUser('user-id');

// ユーザー操作
const { create, update, remove } = useUserActions();
```

### アイテム管理 (`useItems.ts`)

```typescript
import { useItems, useItem, useItemActions } from '@/hooks/useItems';

// アイテム一覧（フィルタリング付き）
const { data } = useItems({
    category: 'electronics',
    status: 'available',
    minPrice: 100,
    maxPrice: 1000
});

// アイテム操作
const { updatePrice, bulkUpdateStatus } = useItemActions();
```

## 利点

### 🎯 **関心の分離**
- ドメインごとに責任が明確
- 変更の影響範囲が限定的

### 🔧 **保守性**
- 機能追加時の影響が局所的
- コードの可読性向上

### 🧪 **テスタビリティ**
- ドメインごとに独立したテスト
- モック化が容易

### 📈 **スケーラビリティ**
- 新しいドメインの追加が簡単
- チーム開発での並行作業が可能

### 🔄 **再利用性**
- 同じaxiosインスタンスを複数ドメインで共有
- 共通パターンの適用

## ベストプラクティス

### 1. **型定義の配置**
```typescript
// ✅ 推奨: 各hooksファイル内で型定義
export interface User {
    id: string;
    name: string;
    // ...
}

// ❌ 非推奨: 巨大な共通型ファイル
```

### 2. **エンドポイントの指定**
```typescript
// ✅ 推奨: hooks内で直接エンドポイント指定
const result = await serviceApiClient.get<UserListResponse>('/users');

// ❌ 非推奨: 事前定義されたエンドポイント関数
```

### 3. **エラーハンドリング**
```typescript
// ✅ 各フックで適切なエラー処理
const [error, setError] = useState<Error | null>(null);

try {
    // API呼び出し
} catch (err) {
    setError(err as Error);
}
```

### 4. **ローディング状態**
```typescript
// ✅ 操作ごとに適切なローディング状態
const [loading, setLoading] = useState(false);
const [actionLoading, setActionLoading] = useState(false);
```

## 新しいドメインの追加手順

### 1. hooksファイル作成
```bash
touch src/hooks/useOrders.ts
```

### 2. 基本構造の実装
```typescript
// 型定義
export interface Order { /* ... */ }

// 一覧取得フック
export const useOrders = (params?: OrderListParams) => { /* ... */ };

// 詳細取得フック
export const useOrder = (id: string) => { /* ... */ };

// 操作フック
export const useOrderActions = () => { /* ... */ };
```

### 3. コンポーネントでの使用
```typescript
import { useOrders, useOrderActions } from '@/hooks/useOrders';
```

## 注意点

### ⚠️ **避けるべきパターン**

1. **巨大なhooksファイル**
   - 複数ドメインを1つのファイルに混在させない

2. **過度な抽象化**
   - 共通化のしすぎで複雑になることを避ける

3. **循環依存**
   - hooks間の相互依存を避ける

### ✅ **推奨パターン**

1. **ドメイン境界の明確化**
   - ビジネスロジックに基づいた分割

2. **共通axiosインスタンスの活用**
   - `serviceApiClient`を各ドメインで再利用

3. **一貫した命名規則**
   - プロジェクト全体で統一されたパターン

## まとめ

ドメインごとのhooks分割により、以下を実現できます：

- **保守性の向上**: 変更の影響範囲が限定的
- **開発効率の向上**: 並行開発が可能
- **コード品質の向上**: 単一責任原則の遵守
- **テストの簡素化**: ドメインごとの独立したテスト

この設計パターンは、中〜大規模なプロジェクトで特に効果を発揮し、長期的な保守性を大幅に向上させます。
