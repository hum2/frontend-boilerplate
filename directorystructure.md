# frontend-boilertemplate

## ディレクトリ構成

```
.
├── src/
│   ├── app/                # Next.js ルーティング（App Router）
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...             # 各ルート/セグメント
│   ├── components/
│   │   ├── ui/             # 基本UI（button, card等）
│   │   │   └── Button/
│   │   │       ├── Button.tsx
│   │   │       ├── Button.test.tsx
│   │   │       └── index.ts
│   │   ├── shadcn/         # shadcnコンポーネント
│   │   └── layouts/        # レイアウト関連
│   ├── features/           # ドメインごとの機能コンポーネント（必要に応じて）
│   ├── utils/              # 汎用関数・ユーティリティ
│   ├── lib/                # 外部連携やAPIクライアント
│   │   ├── api/            # API関連処理
│   │   │   ├── client.ts   # 変更禁止: AIモデル設定
│   │   │   ├── types.ts    # 変更禁止: 型定義
│   │   │   └── config.ts   # 変更禁止: 環境設定
│   │   └── utils/          # 共通関数
│   ├── styles/             # グローバル/モジュールCSS
│   └── schemas/            # zodスキーマ定義
├── public/                 # 静的ファイル
├── tests/                  # e2eテスト(playwright)
├── jest.config.ts
├── playwright.config.ts
├── package.json
└── next.config.js
```
