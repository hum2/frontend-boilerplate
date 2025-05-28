// 外部API例統合エクスポート
export {
    exampleApiClient,
    createExampleApiClient
} from './client';
export { exampleApiConfig } from './config';

// 便利な関数
export const createExampleClient = () => {
    const { createApiClient } = require('../core');
    const { exampleApiConfig } = require('./config');
    return createApiClient(exampleApiConfig);
};
