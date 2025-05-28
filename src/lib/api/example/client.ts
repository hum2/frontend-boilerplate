import { createApiClient } from '../core';
import { exampleApiConfig } from './config';

// 外部API例用のaxiosインスタンスを作成
export const createExampleApiClient = () => {
    return createApiClient(exampleApiConfig);
};

// シングルトンインスタンス
export const exampleApiClient = createExampleApiClient();
