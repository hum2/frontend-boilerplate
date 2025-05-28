# Logger モジュール

アプリケーション全体で使用する統一されたログ管理システム

## 概要

独立したログ管理システムで、責務分離された設計を実現。環境別のログレベル制御、セキュリティ配慮、パフォーマンス最適化を提供します。

## ファイル構成

```
src/lib/logger/
├── types.ts      # LogLevel型定義のみ
├── logger.ts     # Loggerクラス実装のみ
├── factory.ts    # ファクトリーメソッドのみ
└── index.ts      # エクスポート統合のみ
```

### 責務分離による設計

- **`types.ts`**: ログレベル型定義のみ
- **`logger.ts`**: ログ機能のコア実装のみ
- **`factory.ts`**: ロガー生成ファクトリーのみ
- **`index.ts`**: エクスポート統合のみ

## 基本使用方法

### ファクトリーメソッドを使用（推奨）

```typescript
import { createHttpLogger, createAppLogger, createCustomLogger } from '@/lib/logger';

// HTTPクライアント専用ロガー
const httpLogger = createHttpLogger('debug');

// アプリケーション汎用ロガー
const appLogger = createAppLogger('info');

// カスタムプレフィックス付きロガー
const authLogger = createCustomLogger('Auth', 'debug');
const dbLogger = createCustomLogger('Database', 'error');
```

### 直接インスタンス化

```typescript
import { Logger } from '@/lib/logger';

const customLogger = new Logger('info', 'CustomModule');
```

## 環境変数による制御

### HTTPクライアント用ログレベル
```env
# 開発環境: デバッグログ有効
NEXT_PUBLIC_API_LOG_LEVEL=debug

# ステージング環境: エラーのみ
NEXT_PUBLIC_API_LOG_LEVEL=error

# 本番環境: ログ無効
NEXT_PUBLIC_API_LOG_LEVEL=none
```

### アプリケーション汎用ログレベル
```env
# アプリケーション汎用ログレベル
NEXT_PUBLIC_APP_LOG_LEVEL=info
```

## 使用例

### アプリケーション内での汎用ログ

```typescript
import { createAppLogger } from '@/lib/logger';

const logger = createAppLogger();

logger.info('User action completed', { userId: '123', action: 'update' });
logger.error('Validation failed', { field: 'email', value: 'invalid' });
logger.debug('Debug information', { state: currentState });
logger.warn('Deprecated feature used', { feature: 'oldApi' });
```

### カスタムロガーの作成

```typescript
import { createCustomLogger } from '@/lib/logger';

const authLogger = createCustomLogger('Auth', 'debug');
const dbLogger = createCustomLogger('Database', 'error');

authLogger.info('User authenticated');
// 出力: [2024-01-01T12:00:00.000Z] [Auth Info] User authenticated

dbLogger.error('Connection failed');
// 出力: [2024-01-01T12:00:00.000Z] [Database Error] Connection failed
```

### HTTPクライアントでの使用

```typescript
import { HttpClient } from '@/lib/api/core';

const client = new HttpClient({
    enableLogging: true,  // ログを有効化
    logLevel: 'debug'     // 明示的レベル指定（省略可）
});
```

## ログレベル

### 利用可能なレベル

- **`none`**: ログ出力無効（本番環境推奨）
- **`error`**: エラー情報のみ
- **`warn`**: 警告とエラー情報
- **`info`**: 情報、警告、エラー情報
- **`debug`**: すべてのログ情報（開発環境推奨）

### ログレベル別の出力内容

```typescript
// debug: リクエスト/レスポンスの詳細情報、デバッグ情報
// info: リトライやシステム動作情報
// warn: 非推奨機能の使用警告など
// error: エラー情報のみ
// none: ログ出力無効（本番推奨）
```

## 機能特徴

### 🔒 **セキュリティ配慮**
- 本番環境では機密情報の露出を防止
- 環境変数による動的制御

### ⚡ **パフォーマンス最適化**
- 本番環境でのログ処理によるオーバーヘッド排除
- 条件分岐による不要な処理の回避

### 📝 **構造化ログ**
- タイムスタンプ・プレフィックス付きでの統一フォーマット
- JSON形式でのデータ出力対応

### 🔄 **再利用性**
- アプリケーション全体で共通のLoggerクラスを使用
- ファクトリーメソッドによる簡単なインスタンス生成

### 🌍 **環境別制御**
- 開発・ステージング・本番環境での適切なログレベル
- 環境変数による柔軟な設定

## API リファレンス

### Logger クラス

```typescript
class Logger {
    constructor(level: LogLevel, prefix?: string)

    debug(message: string, data?: any): void
    info(message: string, data?: any): void
    warn(message: string, data?: any): void
    error(message: string, data?: any): void
}
```

### ファクトリーメソッド

```typescript
// HTTPクライアント専用ロガー（NEXT_PUBLIC_API_LOG_LEVELを使用）
createHttpLogger(level?: LogLevel): Logger

// アプリケーション汎用ロガー（NEXT_PUBLIC_APP_LOG_LEVELを使用）
createAppLogger(level?: LogLevel): Logger

// カスタムプレフィックス付きロガー
createCustomLogger(prefix: string, level?: LogLevel): Logger
```

### 型定義

```typescript
type LogLevel = 'none' | 'error' | 'warn' | 'info' | 'debug';
```

## ベストプラクティス

### ✅ **推奨パターン**

1. **ファクトリーメソッドの使用**
   ```typescript
   // ✅ 推奨
   const logger = createAppLogger();

   // ❌ 避ける
   const logger = new Logger('info');
   ```

2. **適切なログレベルの選択**
   ```typescript
   // ✅ 推奨: 用途に応じたレベル
   logger.debug('Detailed debug info');  // 開発時のみ
   logger.info('User action');           // 重要な動作
   logger.warn('Deprecated usage');      // 警告
   logger.error('Critical error');       // エラー
   ```

3. **構造化データの活用**
   ```typescript
   // ✅ 推奨: オブジェクトでの詳細情報
   logger.info('User login', { userId, timestamp, ip });

   // ❌ 避ける: 文字列結合
   logger.info(`User ${userId} logged in at ${timestamp}`);
   ```

### ⚠️ **避けるべきパターン**

1. **本番環境でのdebugレベル**
   ```typescript
   // ❌ 本番環境では避ける
   NEXT_PUBLIC_API_LOG_LEVEL=debug
   ```

2. **機密情報のログ出力**
   ```typescript
   // ❌ 機密情報は出力しない
   logger.info('User data', { password, creditCard });
   ```

3. **過度なログ出力**
   ```typescript
   // ❌ パフォーマンスに影響
   for (const item of largeArray) {
       logger.debug('Processing item', item);
   }
   ```

## 他のモジュールとの連携

### HttpClient との連携

HttpClientは自動的にこのLoggerモジュールを使用します：

```typescript
import { HttpClient } from '@/lib/api/core';

// HttpClientが内部的にcreateHttpLogger()を使用
const client = new HttpClient({ enableLogging: true });
```

詳細は [`lib/api/README.md`](../api/README.md) を参照してください。

## トラブルシューティング

### ログが出力されない場合

1. **環境変数の確認**
   ```bash
   echo $NEXT_PUBLIC_API_LOG_LEVEL
   echo $NEXT_PUBLIC_APP_LOG_LEVEL
   ```

2. **ログレベルの確認**
   ```typescript
   // 現在のレベルより低いレベルは出力されない
   const logger = createAppLogger('error');
   logger.info('This will not be shown');  // errorレベルでは非表示
   ```

3. **ブラウザコンソールの確認**
   - 開発者ツールのコンソールタブを確認
   - フィルタリング設定を確認

### パフォーマンスの問題

1. **本番環境でのログレベル設定**
   ```env
   NEXT_PUBLIC_API_LOG_LEVEL=none
   NEXT_PUBLIC_APP_LOG_LEVEL=error
   ```

2. **大量データのログ出力を避ける**
   ```typescript
   // ✅ 推奨: 必要な情報のみ
   logger.info('API response', { status, count: data.length });

   // ❌ 避ける: 大量データの出力
   logger.info('API response', { fullData: largeDataArray });
   ```

## まとめ

このLoggerモジュールにより以下を実現：

- **責務分離**: 独立したログ管理システム
- **環境対応**: 開発・ステージング・本番環境での適切な制御
- **セキュリティ**: 機密情報の露出防止
- **パフォーマンス**: 本番環境での最適化
- **再利用性**: アプリケーション全体での統一されたログ管理
- **保守性**: 明確なファイル構成と責務分離
