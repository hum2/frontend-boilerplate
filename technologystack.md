# 技術スタック

## コア技術
- `TypeScript: ^5.8.3`
- `Node.js: ^22.9.0`
- **AIモデル: claude-3-7-sonnet-20250219 (Anthropic Messages API 2023-06-01) ← バージョン変更禁止**

## フロントエンド
- `Next.js: ^15.3.1`
- `React: ^19.1.0`
- `Tailwind CSS: ^3.4.17`
- `shadcn/ui: ^2.4.1`
- `zod: ^3.24.3`

### テスト
- `jest: ^29.7.0`
- `@testing-library/react: ^16.3.0`
- `@testing-library/jest-dom: ^6.6.3`
- `@testing-library/user-event: ^14.6.1`
- `jest-environment-jsdom: ^29.7.0`
- `ts-jest: ^29.3.2`
- `playwright: ^1.52.0`

## バックエンド
- `SQLite: ^3.0.0`
  - 本番環境はSupabaseを利用
- `Prisma: ^5.22.0`

## 開発ツール
- `npm: ^10.8.3`
- `ESLint: ^9.25.1`
- `TypeScript: ^5.8.3`
- `prettier: ^3.5.3`
- `@types/jest: ^29.5.14`
- `@types/node: ^20.17.30`
- `ts-node: ^10.9.2`

## コンポーネントライブラリ追加情報
- `@radix-ui/react-slot: ^1.2.0`
- `class-variance-authority: ^0.7.1`
- `clsx: ^2.1.1`
- `tailwind-merge: ^3.2.0`
- `tailwindcss-animate: ^1.0.7`
- `lucide-react: ^0.503.0`

---

# API バージョン管理
## 重要な制約事項
- APIクライアントは `app/lib/api/client.ts` で一元管理
- AI モデルのバージョンは client.ts 内で厳密に管理
- これらのファイルは変更禁止（変更が必要な場合は承認が必要）：
  - client.ts  - AIモデルとAPI設定の中核
  - types.ts   - 型定義の一元管理
  - config.ts  - 環境設定の一元管理

## 実装規則
- AIモデルのバージョンは client.ts でのみ定義
- 型定義は必ず types.ts を参照
- 環境変数の利用は config.ts 経由のみ許可
