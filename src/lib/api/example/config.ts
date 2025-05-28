import { type ApiConfig } from '../core';

// 外部API例設定
export const exampleApiConfig: ApiConfig = {
    // baseURL: process.env.NEXT_PUBLIC_EXAMPLE_API_BASE_URL || 'https://api.example.com',
    baseURL: process.env.NEXT_PUBLIC_EXAMPLE_API_BASE_URL || 'https://68245eb465ba05803399fbe5.mockapi.io',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
};
