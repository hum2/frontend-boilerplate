import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { apiConfig } from './config';

// 共通エラーハンドリングインターセプター
function attachResponseInterceptor(instance: AxiosInstance) {
    instance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            if (error.response) {
                // サーバーからのレスポンスエラー
                return Promise.reject({
                    code: (error.response.data as any)?.code || 'unknown_error',
                    message: (error.response.data as any)?.message || 'Unknown error occurred',
                    status: error.response.status,
                    details: (error.response.data as any)?.details,
                });
            } else if (error.request) {
                // リクエストは送信されたがレスポンスがない
                return Promise.reject({
                    code: 'no_response',
                    message: 'No response received from server',
                    status: 500,
                });
            } else {
                // その他のエラー
                return Promise.reject({
                    code: 'request_failed',
                    message: error.message,
                    status: 500,
                });
            }
        }
    );
}

// デフォルトのaxiosインスタンス生成
const axiosInstance: AxiosInstance = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: apiConfig.timeout,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiConfig.apiKey}`,
    },
});
attachResponseInterceptor(axiosInstance);

// サービスごとにカスタムインスタンスを生成するファクトリ
export function createApiClient(config: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create(config);
    attachResponseInterceptor(instance);
    return instance;
}

export default axiosInstance;
