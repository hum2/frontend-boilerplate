import { HttpClient, type HttpClientConfig } from './HttpClient';

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
}

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
