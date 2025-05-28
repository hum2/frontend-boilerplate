'use client';

import React, { useState } from 'react';
import { useUsers, useUserActions, type User, type UserListParams } from '@/hooks/useUsers';

export const UserList: React.FC = () => {
    const [params, setParams] = useState<UserListParams>({
        page: 1,
        limit: 10,
    });

    const { data, loading, error, refetch } = useUsers(params);
    const { updateStatus, resetPassword, loading: actionLoading } = useUserActions();

    const handleStatusChange = async (id: string, status: User['status']) => {
        const result = await updateStatus(id, status);
        if (result) {
            refetch(); // データを再取得
        }
    };

    const handleResetPassword = async (id: string) => {
        const newPassword = prompt('新しいパスワードを入力してください:');
        if (newPassword) {
            const result = await resetPassword(id, newPassword);
            if (result) {
                alert('パスワードがリセットされました');
            }
        }
    };

    const handlePageChange = (page: number) => {
        setParams(prev => ({ ...prev, page }));
    };

    const handleRoleFilter = (role: User['role'] | 'all') => {
        setParams(prev => ({
            ...prev,
            page: 1,
            role: role === 'all' ? undefined : role,
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-lg">ユーザー情報を読み込み中...</div>
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
                <label className="text-sm font-medium">ロール:</label>
                <select
                    value={params.role || 'all'}
                    onChange={(e) => handleRoleFilter(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-md"
                >
                    <option value="all">すべて</option>
                    <option value="admin">管理者</option>
                    <option value="user">ユーザー</option>
                    <option value="guest">ゲスト</option>
                </select>
            </div>

            {/* ユーザー一覧 */}
            <div className="grid gap-4">
                {data.users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="text-gray-600 mt-1">{user.email}</p>
                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span>ロール: {user.role}</span>
                                    <span>作成日: {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${user.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {user.status === 'active' ? 'アクティブ' : '非アクティブ'}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${user.role === 'admin'
                                        ? 'bg-purple-100 text-purple-800'
                                        : user.role === 'user'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {user.role === 'admin' ? '管理者' :
                                        user.role === 'user' ? 'ユーザー' : 'ゲスト'}
                                </span>
                            </div>
                        </div>

                        {/* アクション */}
                        <div className="flex gap-2 mt-4">
                            <select
                                value={user.status}
                                onChange={(e) => handleStatusChange(user.id, e.target.value as User['status'])}
                                disabled={actionLoading}
                                className="px-2 py-1 text-xs border border-gray-300 rounded"
                            >
                                <option value="active">アクティブ</option>
                                <option value="inactive">非アクティブ</option>
                            </select>
                            <button
                                onClick={() => handleResetPassword(user.id)}
                                disabled={actionLoading}
                                className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                            >
                                パスワードリセット
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
