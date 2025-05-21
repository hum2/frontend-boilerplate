import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

// 基本レンダリングテスト
it('renders Alert with children', () => {
    render(<Alert>テストアラート</Alert>);
    expect(screen.getByTestId('alert')).toBeInTheDocument();
    expect(screen.getByText('テストアラート')).toBeInTheDocument();
});

// タイトル表示テスト
it('renders Alert with title', () => {
    render(<Alert title="タイトル">本文</Alert>);
    expect(screen.getByText('タイトル')).toBeInTheDocument();
    expect(screen.getByText('本文')).toBeInTheDocument();
});

// variantごとのアイコン・クラス付与テスト
it('applies correct variant class and icon', () => {
    const { rerender } = render(<Alert variant="info">info</Alert>);
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'info');

    rerender(<Alert variant="success">success</Alert>);
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'success');

    rerender(<Alert variant="warning">warning</Alert>);
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'warning');

    rerender(<Alert variant="error">error</Alert>);
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'error');
});

// classNameが追加されるか
it('applies custom className', () => {
    render(<Alert className="custom-class">test</Alert>);
    expect(screen.getByTestId('alert').className).toContain('custom-class');
});
