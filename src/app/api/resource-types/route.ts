import { NextRequest, NextResponse } from 'next/server';

// マスターデータAPIエンドポイント
export async function GET(request: NextRequest) {
    try {
        // MasterDataResponse形式のダミーデータ
        const resourceTypes = [
            {
                id: '1',
                value: 'cpu',
                display_order: '1'
            },
            {
                id: '2',
                value: 'memory',
                display_order: '2'
            },
            {
                id: '3',
                value: 'storage',
                display_order: '3'
            },
            {
                id: '4',
                value: 'network',
                display_order: '4'
            }
        ];

        return NextResponse.json(resourceTypes);
    } catch (error) {
        console.error('Resource Types API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch resource types' },
            { status: 500 }
        );
    }
}
