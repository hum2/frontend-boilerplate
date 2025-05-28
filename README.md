# Frontend Boilertemplate

Next.js、TypeScript、Tailwind CSSを使用した最新のWebアプリケーションボイラープレート

## 技術スタック

- **フロントエンド**: Next.js 15.3, React 19.0.0, Tailwind CSS 3.4.17, shadcn/ui 2.1.8
- **バックエンド**: SQLite (開発環境), Supabase (本番環境), Prisma ORM
- **言語**: TypeScript 5.0.0
- **テスト**: Jest, React Testing Library, Playwright
- **AI**: Claude 3.7 Sonnet
- **コーディング規約**: 統一されたファイル命名規則とプロジェクト構造

## 機能

- モダンなUI/UXデザイン
- レスポンシブレイアウト
- ダークモード対応
- 型安全なデータ処理
- AIサービス連携
- 一貫したコーディング規約

## 始め方

### 必要条件

- Node.js 20.0.0以上
- npm 10.0.0以上

### VSCode拡張機能

- [Playwright Test for VSCode](https://marketplace.cursorapi.com/items?itemName=ms-playwright.playwright)
- [Figma for VS Code](https://marketplace.cursorapi.com/items?itemName=figma.figma-vscode-extension)

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/frontend-boilertemplate.git
cd $_

# 依存関係をインストール
npm install

# Prismaクライアントを生成
npm run prisma:generate

# 開発サーバーを起動
npm run dev
```

### 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください:

```
NEXT_PUBLIC_API_KEY="your-api-key"
NEXT_PUBLIC_API_BASE_URL="https://api.example.com"
```

## 開発

### コマンド

- `npm run dev`: 開発サーバーを起動
- `npm run build`: プロダクションビルドを作成
- `npm run start`: プロダクションサーバーを起動
- `npm run lint`: ESLintを実行
- `npm run test`: Jestテストを実行
- `npm run test:e2e`: Playwrightでのe2eテストを実行
- `npm run prisma:generate`: Prismaクライアントを生成
- `npm run prisma:migrate:dev`: Prismaマイグレーションを開発環境で実行
- `npm run prisma:studio`: Prisma Studioを起動してデータベースを操作

## コーディング規約

### ファイル・ディレクトリ命名規則

プロジェクト全体で一貫した命名規則を採用しています：

#### 📁 **ディレクトリ名**
- **コンポーネント**: PascalCase（例: `Button/`, `UserProfile/`, `ApiStatus/`）
- **ユーティリティ**: camelCase（例: `utils/`, `hooks/`, `lib/`）
- **機能別**: camelCase（例: `features/`, `domain/`, `infrastructure/`）

#### 📄 **ファイル名**
- **Reactコンポーネント**: PascalCase（例: `Button.tsx`, `UserProfile.tsx`, `ApiStatus.tsx`）
- **ユーティリティ・ロジック**: camelCase（例: `userService.ts`, `apiClient.ts`, `logger.ts`）
- **型定義**: camelCase（例: `types.ts`, `interfaces.ts`, `models.ts`）
- **設定ファイル**: camelCase（例: `config.ts`, `constants.ts`）
- **テストファイル**: 対象ファイル名 + `.test` または `.spec`（例: `Button.test.tsx`, `userService.spec.ts`）
- **エクスポート統合**: 常に `index.ts`

#### 🎯 **命名規則の原則**

**✅ 推奨パターン**
```
src/
├── components/
│   ├── Button/              # PascalCase（コンポーネントディレクトリ）
│   │   ├── Button.tsx       # PascalCase（Reactコンポーネント）
│   │   ├── Button.test.tsx  # PascalCase + .test
│   │   └── index.ts         # エクスポート統合
│   └── UserProfile/         # PascalCase（コンポーネントディレクトリ）
├── lib/
│   ├── api/
│   │   ├── client.ts        # camelCase（ユーティリティ）
│   │   ├── types.ts         # camelCase（型定義）
│   │   └── index.ts         # エクスポート統合
│   ├── logger/
│   │   ├── types.ts
│   │   ├── logger.ts
│   │   ├── factory.ts
│   │   └── index.ts
│   └── utils/                  # 共通ユーティリティ
│       ├── helpers.ts       # camelCase（ヘルパー関数）
│       ├── constants.ts     # camelCase（定数定義）
│       └── index.ts         # エクスポート統合
└── hooks/
    ├── useAuth.ts           # camelCase（カスタムフック）
    └── useApiClient.ts      # camelCase（カスタムフック）
```

**❌ 避けるべきパターン**
```
src/
├── Components/              # ❌ ディレクトリ名の大文字始まり（ユーティリティ系）
├── lib/
│   ├── ApiClient.ts         # ❌ ユーティリティファイルのPascalCase
│   └── HelperUtils.ts       # ❌ ユーティリティファイルのPascalCase
└── hooks/
    └── UseAuth.ts           # ❌ フックファイルのPascalCase
```

#### 🔧 **一貫性の利点**
- **開発効率**: ファイル検索・ナビゲーションの高速化
- **チーム開発**: 新規参加者の学習コスト削減
- **保守性**: 命名パターンによる責務の明確化
- **ツール連携**: IDEやビルドツールとの互換性向上

#### 📝 **追加ガイドライン**
- **略語**: 可能な限り避け、明確な名前を使用（`btn` → `button`, `usr` → `user`）
- **複数形**: 配列やリストを扱う場合は複数形を使用（`users.ts`, `items.ts`）
- **接頭辞**: 用途に応じた接頭辞を使用（`use` for hooks, `create` for factories）

## プロジェクト構造

```
.
├── src/
│   ├── app/                        # Next.js ルーティング（App Router）
│   │   ├── layout.tsx              # アプリ全体のレイアウト
│   │   └── page.tsx                # ホームページ
│   ├── components/                 # UI・レイアウト・shadcn等のコンポーネント
│   │   ├── ui/                     # 基本UI（Button, Card, Table, ...）
│   │   ├── shadcn/                 # shadcn/uiベースの拡張コンポーネント
│   │   ├── layouts/                # レイアウト関連
│   │   └── examples/               # サンプル・デモ用コンポーネント
│   ├── domain/                     # ドメイン層（エンティティ・リポジトリIF等）
│   │   └── todo/                   # Todoドメイン例
│   ├── infrastructure/             # インフラ層（APIクライアント等）
│   │   └── api/
│   │       └── todo/               # API実装例
│   │           └── todo_repository_impl.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── axiosInstance.ts
│   │   │   ├── fetchApi.ts
│   │   │   ├── config.ts
│   │   │   └── types.ts
│   │   ├── logger/
│   │   │   ├── types.ts
│   │   │   ├── logger.ts
│   │   │   ├── factory.ts
│   │   │   └── index.ts
│   │   └── utils/                  # 共通ユーティリティ
│   ├── di/                         # DIコンテナ・Provider
│   │   ├── provider.tsx
│   │   ├── container.ts
│   │   └── server.ts
│   ├── features/                   # ドメインごとの機能コンポーネント
│   ├── hooks/                      # カスタムフック
│   │   └── use-mobile.tsx
│   ├── styles/                     # グローバル/モジュールCSS
│   │   └── globals.css
│   └── utils/                      # 共通関数
├── public/                         # 静的ファイル
├── tests/                          # e2eテスト(playwright)
└── ...                             # その他の設定ファイル
```

## 開発ガイドライン

### 新規ファイル作成時の注意事項

1. **命名規則の遵守**: 上記のコーディング規約に従ってファイル・ディレクトリ名を決定
2. **責務の分離**: 1つのファイルには1つの責務のみを実装
3. **index.tsの活用**: ディレクトリ内のエクスポート統合には必ずindex.tsを使用
4. **型安全性の確保**: TypeScriptの型定義を適切に活用
5. **テストファイルの作成**: 新規機能には対応するテストファイルを作成

### コードレビューのポイント

- ✅ ファイル命名規則の遵守
- ✅ 適切なディレクトリ配置
- ✅ 責務分離の実現
- ✅ 型安全性の確保
- ✅ テストカバレッジの維持

### 推奨開発フロー

1. **設計**: 機能要件と技術要件の明確化
2. **構造設計**: ディレクトリ・ファイル構成の計画
3. **実装**: コーディング規約に従った実装
4. **テスト**: ユニット・統合・E2Eテストの作成
5. **レビュー**: コードレビューとリファクタリング

## ライセンス

MIT

## 貢献

プルリクエストや課題報告は歓迎します。
