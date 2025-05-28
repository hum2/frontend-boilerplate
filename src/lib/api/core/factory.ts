import { HttpClient, type HttpClientConfig, type AuthConfig } from './HttpClient';

/**
 * 汎用APIクライアント作成ファクトリー
 *
 * 各外部API（auth、example等）で共通して使用できる
 * axiosインスタンス作成のためのファクトリーメソッド
 */

// 基本的なAPI設定インターフェース
export interface ApiConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
    auth?: {
        type: 'bearer' | 'apikey' | 'basic' | 'custom';
        token?: string;
        apiKey?: string;
        username?: string;
        password?: string;
        customHeader?: { key: string; value: string };
    };
}

// 型ガード関数
const isValidAuthType = (type: string | undefined): type is AuthConfig['type'] => {
    const validTypes: AuthConfig['type'][] = ['bearer', 'apikey', 'basic', 'custom'];
    return type !== undefined && validTypes.includes(type as AuthConfig['type']);
};

/**
 * APIクライアントを作成する汎用ファクトリーメソッド
 *
 * @param config API設定
 * @returns HttpClientインスタンス
 */
export const createApiClient = (config: ApiConfig): HttpClient => {
    const httpConfig: HttpClientConfig = {
        baseURL: config.baseURL,
        timeout: config.timeout || 10000,
        headers: config.headers || {},
    };

    // 認証設定の変換
    if (config.auth) {
        httpConfig.auth = {
            type: config.auth.type,
            token: config.auth.token,
            apiKey: config.auth.apiKey,
            username: config.auth.username,
            password: config.auth.password,
            customHeader: config.auth.customHeader,
        };
    }

    return new HttpClient(httpConfig);
};

/**
 * 環境変数ベースのAPI設定を作成するヘルパー
 *
 * @param envPrefix 環境変数のプレフィックス（例: 'AUTH_API'）
 * @returns ApiConfig
 */
export const createConfigFromEnv = (envPrefix: string): ApiConfig => {
    const baseURL = process.env[`${envPrefix}_BASE_URL`];
    if (!baseURL) {
        throw new Error(`Environment variable ${envPrefix}_BASE_URL is required`);
    }

    const config: ApiConfig = {
        baseURL,
        timeout: process.env[`${envPrefix}_TIMEOUT`]
            ? parseInt(process.env[`${envPrefix}_TIMEOUT`]!, 10)
            : 10000,
    };

    // 認証設定の読み込み
    const authType = process.env[`${envPrefix}_AUTH_TYPE`];
    if (isValidAuthType(authType)) {
        config.auth = {
            type: authType,
            token: process.env[`${envPrefix}_AUTH_TOKEN`],
            apiKey: process.env[`${envPrefix}_AUTH_API_KEY`],
            username: process.env[`${envPrefix}_AUTH_USERNAME`],
            password: process.env[`${envPrefix}_AUTH_PASSWORD`],
        };

        // カスタムヘッダーの設定
        const customHeaderKey = process.env[`${envPrefix}_AUTH_CUSTOM_HEADER_KEY`];
        const customHeaderValue = process.env[`${envPrefix}_AUTH_CUSTOM_HEADER_VALUE`];
        if (customHeaderKey && customHeaderValue) {
            config.auth.customHeader = {
                key: customHeaderKey,
                value: customHeaderValue,
            };
        }
    }

    return config;
};

/**
 * 事前定義された設定でAPIクライアントを作成
 *
 * @param serviceName サービス名（'auth', 'example'等）
 * @returns HttpClientインスタンス
 */
export const createServiceClient = (serviceName: string): HttpClient => {
    const envPrefix = `${serviceName.toUpperCase()}_API`;
    const config = createConfigFromEnv(envPrefix);
    return createApiClient(config);
};
