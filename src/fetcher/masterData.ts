import { exampleApiClient } from '@/lib/api/example';

// マスターデータの型定義
export interface MasterDataResponse {
    id: string;
    value: string;
    display_order: string;
}

// サーバーサイド用マスターデータ読み込み関数
export const loadMasterData = async () => {
    const [resourceTypes, resourceTypes2, resourceTypes3] = await Promise.all([
        exampleApiClient.get<MasterDataResponse[]>('/api/resource-types'),
        exampleApiClient.get<MasterDataResponse[]>('/api/resource-types'),
        exampleApiClient.get<MasterDataResponse[]>('/api/resource-types'),
    ]);

    return {
        resourceTypes,
        resourceTypes2,
        resourceTypes3
    };
};
