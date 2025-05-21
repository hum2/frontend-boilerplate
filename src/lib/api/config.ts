// この設定ファイルは環境変数の管理を一元化します
// 変更が必要な場合は承認が必要です

// APIキーや環境設定
export const apiConfig = {
    // APIキー（環境変数から取得）
    apiKey: process.env.NEXT_PUBLIC_API_KEY || '',

    // API基本URL
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',

    // 環境設定
    environment: process.env.NODE_ENV || 'development',

    // タイムアウト設定（ミリ秒）
    timeout: 30000,

    // リトライ設定
    maxRetries: 3,
    retryDelay: 1000,
};

// 開発モードかどうかの判定
export const isDevelopment = apiConfig.environment === 'development';

// プロダクションモードかどうかの判定
export const isProduction = apiConfig.environment === 'production';

// テストモードかどうかの判定
export const isTest = apiConfig.environment === 'test';
