import axiosInstance from './axiosInstance';
import { ApiResponse } from '@/lib/api/types';
import { AxiosRequestConfig } from 'axios';

// カスタムリクエストオプション（axios用）
interface CustomAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
    timeout?: number;
}

/**
 * 汎用的なAPIリクエスト関数（axiosベース）
 * @param endpoint エンドポイントパス
 * @param config axiosリクエスト設定
 * @returns レスポンスデータ
 */
export async function fetchApi<T>(
    endpoint: string,
    config: CustomAxiosRequestConfig = {}
): Promise<ApiResponse<T>> {
    try {
        const response = await axiosInstance.request<T>({
            url: endpoint,
            ...config,
        });
        return {
            data: response.data,
            status: response.status,
            message: 'Success',
        };
    } catch (error: any) {
        // axiosInstanceのインターセプターで整形済み
        throw error;
    }
}
