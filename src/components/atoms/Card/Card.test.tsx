import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

// 基本レンダリングテスト
it('renders Card with children', () => {
    render(<Card>テストカード</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('テストカード')).toBeInTheDocument();
});

// タイトル・説明表示テスト
it('renders Card with title and description', () => {
    render(<Card title="タイトル" description="説明">本文</Card>);
    expect(screen.getByText('タイトル')).toBeInTheDocument();
    expect(screen.getByText('説明')).toBeInTheDocument();
    expect(screen.getByText('本文')).toBeInTheDocument();
});

// フッター表示テスト
it('renders Card with footer', () => {
    render(<Card footer={<div>フッター</div>}>本文</Card>);
    expect(screen.getByText('フッター')).toBeInTheDocument();
});

// classNameが追加されるか
it('applies custom className', () => {
    render(<Card className="custom-class">test</Card>);
    expect(screen.getByTestId('card').className).toContain('custom-class');
});
