import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../types';
import { createHttpLogger, Logger, LogLevel } from '@/lib/logger';

// HTTPクライアント設定
export interface HttpClientConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    retries?: number;
    enableLogging?: boolean;
    logLevel?: LogLevel; // ログレベル制御を追加
}

// 汎用リクエスト設定インターフェース（axiosの実装詳細を隠蔽）
export interface RequestConfig {
    headers?: Record<string, string>;
    timeout?: number;
    params?: Record<string, any>;
    data?: any; // リクエストボディ（DELETEメソッドでも使用可能）
}

// HTTPクライアントクラス
export class HttpClient {
    private instance: AxiosInstance;
    private config: HttpClientConfig;
    private logger: Logger;

    constructor(config: HttpClientConfig = {}) {
        this.config = {
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 3,
            enableLogging: false,
            logLevel: 'none', // デフォルトはログ無効
            ...config,
        };

        // ログレベルの決定（環境変数優先）
        const envLogLevel = process.env.NEXT_PUBLIC_API_LOG_LEVEL as LogLevel;
        const logLevel = envLogLevel || this.config.logLevel || 'none';

        this.logger = this.config.enableLogging ? createHttpLogger(logLevel) : createHttpLogger('none');

        // axiosインスタンス作成
        const { retries, enableLogging, logLevel: _, ...axiosConfig } = this.config;
        this.instance = axios.create(axiosConfig);

        this.setupInterceptors();
    }

    // RequestConfigをAxiosRequestConfigに変換するヘルパー
    private toAxiosConfig(config?: RequestConfig): AxiosRequestConfig | undefined {
        if (!config) return undefined;

        return {
            headers: config.headers,
            timeout: config.timeout,
            params: config.params,
            data: config.data,
        };
    }

    // インターセプターの設定
    private setupInterceptors(): void {
        // リクエストインターセプター
        this.instance.interceptors.request.use(
            (config) => {
                this.logger.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`, {
                    headers: config.headers,
                    params: config.params
                });

                return config;
            },
            (error) => {
                this.logger.error('Request failed', {
                    message: error.message,
                    config: error.config
                });
                return Promise.reject(error);
            }
        );

        // レスポンスインターセプター
        this.instance.interceptors.response.use(
            (response) => {
                this.logger.debug(`Response: ${response.status} ${response.config.url}`, {
                    status: response.status,
                    statusText: response.statusText
                });
                return response;
            },
            async (error: AxiosError) => {
                this.logger.error('Response error', {
                    status: error.response?.status,
                    url: error.config?.url,
                    message: error.message
                });

                // シンプルなリトライ処理
                if (this.shouldRetry(error)) {
                    return this.retryRequest(error);
                }

                return Promise.reject(this.normalizeError(error));
            }
        );
    }

    // リトライ判定
    private shouldRetry(error: AxiosError): boolean {
        if (!this.config.retries) return false;

        const config = error.config as any;
        const retryCount = config.__retryCount || 0;

        if (retryCount >= this.config.retries) return false;

        // 5xx エラーまたはネットワークエラーのみリトライ
        const status = error.response?.status;
        return !status || status >= 500;
    }

    // リトライ処理
    private async retryRequest(error: AxiosError): Promise<AxiosResponse> {
        const config = error.config as any;
        config.__retryCount = (config.__retryCount || 0) + 1;

        this.logger.info(`Retrying request (attempt ${config.__retryCount})`, {
            url: config.url,
            method: config.method
        });

        // 1秒待機
        await new Promise(resolve => setTimeout(resolve, 1000));

        return this.instance.request(config);
    }

    // エラーの標準化
    private normalizeError(error: AxiosError): ApiError {
        if (error.response) {
            const data = error.response.data as any;
            return {
                code: data?.code || 'server_error',
                message: data?.message || error.message || 'Server error occurred',
                status: error.response.status,
                details: data?.details,
            };
        } else if (error.request) {
            return {
                code: 'no_response',
                message: 'No response received from server',
                status: 0,
            };
        } else {
            return {
                code: 'request_failed',
                message: error.message || 'Request failed',
                status: 0,
            };
        }
    }

    // HTTP メソッド
    public async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, this.toAxiosConfig(config));
        return response.data;
    }

    public async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, this.toAxiosConfig(config));
        return response.data;
    }

    public async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, this.toAxiosConfig(config));
        return response.data;
    }

    public async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        const response = await this.instance.patch<T>(url, data, this.toAxiosConfig(config));
        return response.data;
    }

    public async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
        const response = await this.instance.delete<T>(url, this.toAxiosConfig(config));
        return response.data;
    }
}
