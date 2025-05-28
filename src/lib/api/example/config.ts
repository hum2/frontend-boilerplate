import { type ApiConfig } from '../core';

// Bearer認証ヘッダーを生成するヘルパー関数
const createAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {};

    const token = process.env.NEXT_PUBLIC_EXAMPLE_API_AUTH_TOKEN;
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

// 外部API例設定
export const exampleApiConfig: ApiConfig = {
    // baseURL: process.env.NEXT_PUBLIC_EXAMPLE_API_BASE_URL || 'https://api.example.com',
    baseURL: process.env.NEXT_PUBLIC_EXAMPLE_API_BASE_URL || 'https://68245eb465ba05803399fbe5.mockapi.io',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        ...createAuthHeaders(), // Bearer認証ヘッダーを統合
    },
};
