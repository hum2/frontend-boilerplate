// このファイルはAPI関連の型定義を一元管理します
// 変更が必要な場合は承認が必要です

// APIレスポンスの基本型
export interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

// APIエラーの型
export interface ApiError {
    code: string;
    message: string;
    status: number;
    details?: Record<string, unknown>;
}

// ユーザー情報の型
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

// 認証関連の型
export interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
    expiresAt: number;
}

// AIモデル設定の型
export interface AIModelConfig {
    modelName: string;
    modelVersion: string;
    apiVersion: string;
    temperature: number;
    maxTokens: number;
}

// AIリクエストの型
export interface AIRequestPayload {
    prompt: string;
    options?: {
        temperature?: number;
        maxTokens?: number;
        stop?: string[];
    };
}

// AIレスポンスの型
export interface AIResponsePayload {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}
