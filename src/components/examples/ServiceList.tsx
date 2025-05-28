'use client';

import React, { useState } from 'react';
import { useServices, useServiceActions } from '@/hooks/useServices';
import { type ServiceInfo, type ServiceListParams } from '@/lib/api/service';

export const ServiceList: React.FC = () => {
    const [params, setParams] = useState<ServiceListParams>({
        page: 1,
        limit: 10,
    });

    const { data, loading, error, refetch } = useServices(params);
    const { updateStatus, checkHealth, loading: actionLoading } = useServiceActions();

    const handleStatusChange = async (id: string, status: ServiceInfo['status']) => {
        const result = await updateStatus(id, status);
        if (result) {
            refetch(); // データを再取得
        }
    };

    const handleHealthCheck = async (id: string) => {
        const result = await checkHealth(id);
        if (result) {
            console.log('Health check result:', result);
        }
    };

    const handlePageChange = (page: number) => {
        setParams(prev => ({ ...prev, page }));
    };

    const handleStatusFilter = (status: ServiceInfo['status'] | 'all') => {
        setParams(prev => ({
            ...prev,
            page: 1,
            status: status === 'all' ? undefined : status,
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-lg">サービス情報を読み込み中...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <h3 className="text-red-800 font-medium">エラーが発生しました</h3>
                <p className="text-red-600 mt-1">{error.message}</p>
                <button
                    onClick={refetch}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    再試行
                </button>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center p-8">
                <div className="text-gray-500">データがありません</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* フィルター */}
            <div className="flex gap-4 items-center">
                <label className="text-sm font-medium">ステータス:</label>
                <select
                    value={params.status || 'all'}
                    onChange={(e) => handleStatusFilter(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-md"
                >
                    <option value="all">すべて</option>
                    <option value="active">アクティブ</option>
                    <option value="inactive">非アクティブ</option>
                    <option value="maintenance">メンテナンス</option>
                </select>
            </div>

            {/* サービス一覧 */}
            <div className="grid gap-4">
                {data.services.map((service) => (
                    <div
                        key={service.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{service.name}</h3>
                                <p className="text-gray-600 mt-1">{service.description}</p>
                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span>バージョン: {service.version}</span>
                                    <span>エンドポイント: {service.endpoints.length}個</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${service.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : service.status === 'inactive'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {service.status === 'active' ? 'アクティブ' :
                                        service.status === 'inactive' ? '非アクティブ' : 'メンテナンス'}
                                </span>
                            </div>
                        </div>

                        {/* アクション */}
                        <div className="flex gap-2 mt-4">
                            <select
                                value={service.status}
                                onChange={(e) => handleStatusChange(service.id, e.target.value as ServiceInfo['status'])}
                                disabled={actionLoading}
                                className="px-2 py-1 text-xs border border-gray-300 rounded"
                            >
                                <option value="active">アクティブ</option>
                                <option value="inactive">非アクティブ</option>
                                <option value="maintenance">メンテナンス</option>
                            </select>
                            <button
                                onClick={() => handleHealthCheck(service.id)}
                                disabled={actionLoading}
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            >
                                ヘルスチェック
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ページネーション */}
            {data.pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(data.pagination.page - 1)}
                        disabled={data.pagination.page === 1}
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    >
                        前へ
                    </button>
                    <span className="px-3 py-1">
                        {data.pagination.page} / {data.pagination.totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(data.pagination.page + 1)}
                        disabled={data.pagination.page === data.pagination.totalPages}
                        className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    >
                        次へ
                    </button>
                </div>
            )}
        </div>
    );
};
