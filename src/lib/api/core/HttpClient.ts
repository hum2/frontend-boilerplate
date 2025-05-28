import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../types';

// 認証設定
export interface AuthConfig {
    type: 'bearer' | 'apikey' | 'basic' | 'custom';
    token?: string;
    apiKey?: string;
    username?: string;
    password?: string;
    customHeader?: { key: string; value: string };
}

// HTTPクライアント設定
export interface HttpClientConfig {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
    auth?: AuthConfig;
    retries?: number;
    enableLogging?: boolean;
}

// HTTPクライアントクラス
export class HttpClient {
    private instance: AxiosInstance;
    private config: HttpClientConfig;

    constructor(config: HttpClientConfig = {}) {
        this.config = {
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
            retries: 3,
            enableLogging: false,
            ...config,
        };

        // axiosインスタンス作成
        const { auth, retries, enableLogging, ...axiosConfig } = this.config;
        this.instance = axios.create(axiosConfig);

        this.setupInterceptors();
    }

    // インターセプターの設定
    private setupInterceptors(): void {
        // リクエストインターセプター
        this.instance.interceptors.request.use(
            (config) => {
                // 認証ヘッダーの設定
                if (this.config.auth) {
                    this.addAuthHeader(config);
                }

                // ログ出力
                if (this.config.enableLogging) {
                    console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
                }

                return config;
            },
            (error) => {
                if (this.config.enableLogging) {
                    console.error('❌ Request Error:', error.message);
                }
                return Promise.reject(error);
            }
        );

        // レスポンスインターセプター
        this.instance.interceptors.response.use(
            (response) => {
                if (this.config.enableLogging) {
                    console.log('✅ Response:', response.status, response.config.url);
                }
                return response;
            },
            async (error: AxiosError) => {
                if (this.config.enableLogging) {
                    console.error('❌ Response Error:', error.response?.status, error.config?.url);
                }

                // シンプルなリトライ処理
                if (this.shouldRetry(error)) {
                    return this.retryRequest(error);
                }

                return Promise.reject(this.normalizeError(error));
            }
        );
    }

    // 認証ヘッダーの追加
    private addAuthHeader(config: InternalAxiosRequestConfig): void {
        if (!this.config.auth || !config.headers) return;

        const { auth } = this.config;

        switch (auth.type) {
            case 'bearer':
                if (auth.token) {
                    config.headers['Authorization'] = `Bearer ${auth.token}`;
                }
                break;
            case 'apikey':
                if (auth.apiKey) {
                    config.headers['X-API-Key'] = auth.apiKey;
                }
                break;
            case 'basic':
                if (auth.username && auth.password) {
                    const credentials = btoa(`${auth.username}:${auth.password}`);
                    config.headers['Authorization'] = `Basic ${credentials}`;
                }
                break;
            case 'custom':
                if (auth.customHeader) {
                    config.headers[auth.customHeader.key] = auth.customHeader.value;
                }
                break;
        }
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
    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.put<T>(url, data, config);
        return response.data;
    }

    public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.patch<T>(url, data, config);
        return response.data;
    }

    public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.delete<T>(url, config);
        return response.data;
    }
}
