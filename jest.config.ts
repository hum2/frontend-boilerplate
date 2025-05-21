import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // next.config.jsとpackage.jsonのあるディレクトリへのパス
    dir: './',
});

// Jestに渡すカスタム設定
const config: Config = {
    // テストファイルが配置されているディレクトリ
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/*.test.ts', '**/*.test.tsx'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/types/**/*.ts',
        '!**/node_modules/**',
    ],
    // モジュールのモック設定
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    // セットアップファイル
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// next/jestを使用してNext.js固有の設定を含むJest設定を作成
export default createJestConfig(config);
