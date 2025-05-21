# Frontend Boilertemplate

Next.js、TypeScript、Tailwind CSSを使用した最新のWebアプリケーションボイラープレート

## 技術スタック

- **フロントエンド**: Next.js 15.3, React 19.0.0, Tailwind CSS 3.4.17, shadcn/ui 2.1.8
- **バックエンド**: SQLite (開発環境), Supabase (本番環境), Prisma ORM
- **言語**: TypeScript 5.0.0
- **テスト**: Jest, React Testing Library, Playwright
- **AI**: Claude 3.7 Sonnet

## 機能

- モダンなUI/UXデザイン
- レスポンシブレイアウト
- ダークモード対応
- 型安全なデータ処理
- AIサービス連携

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
│   │   ├── api/                    # API共通処理・型定義
│   │   │   ├── axiosInstance.ts
│   │   │   ├── fetchApi.ts
│   │   │   ├── config.ts
│   │   │   └── types.ts
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

## ライセンス

MIT

## 貢献

プルリクエストや課題報告は歓迎します。
