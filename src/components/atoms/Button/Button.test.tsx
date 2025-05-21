import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

// グローバルJest型の宣言
declare global {
    // eslint-disable-next-line no-var
    var describe: (name: string, fn: () => void) => void;
    // eslint-disable-next-line no-var
    var test: (name: string, fn: () => void) => void;
    // eslint-disable-next-line no-var
    var expect: any;

    namespace jest {
        interface Mock<T = any, Y extends any[] = any[]> {
            (...args: Y): T;
            mockImplementation: (fn: (...args: Y) => T) => Mock<T, Y>;
            mockReturnValue: (value: T) => Mock<T, Y>;
            mockReturnThis: () => Mock<T, Y>;
            mockResolvedValue: (value: Awaited<T>) => Mock<Promise<Awaited<T>>, Y>;
            mockRejectedValue: (value: any) => Mock<Promise<Awaited<T>>, Y>;
            getMockName: () => string;
            mockName: (name: string) => Mock<T, Y>;
            mock: { calls: Y[]; results: any[]; instances: T[]; invocationCallOrder: number[] };
            mockClear: () => Mock<T, Y>;
            mockReset: () => Mock<T, Y>;
            mockRestore: () => Mock<T, Y>;
            toHaveBeenCalledTimes(expected: number): void;
        }
    }

    // eslint-disable-next-line no-var
    var jest: {
        fn: () => jest.Mock;
    };
}

describe('Button コンポーネント', () => {
    test('正しいラベルでレンダリングされる', () => {
        render(<Button label="テストボタン" onClick={() => { }} />);
        expect(screen.getByText('テストボタン')).toBeInTheDocument();
    });

    test('クリックイベントを正常に発火する', () => {
        const handleClick = jest.fn();
        render(<Button label="クリック" onClick={handleClick} />);

        fireEvent.click(screen.getByText('クリック'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('プライマリバリアントのスタイルが適用される', () => {
        render(<Button label="プライマリ" onClick={() => { }} variant="primary" />);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('bg-primary');
    });

    test('セカンダリバリアントのスタイルが適用される', () => {
        render(<Button label="セカンダリ" onClick={() => { }} variant="secondary" />);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('bg-secondary');
    });

    test('無効状態のスタイルが適用される', () => {
        render(<Button label="無効" onClick={() => { }} disabled />);
        const button = screen.getByTestId('button');
        expect(button).toHaveClass('disabled:opacity-50');
        expect(button).toBeDisabled();
    });
});
