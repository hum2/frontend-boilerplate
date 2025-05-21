import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

// 基本レンダリングテスト
it('renders Input with label and children', () => {
    render(<Input label="ラベル" id="test-input" />);
    expect(screen.getByLabelText('ラベル')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
});

// error表示テスト
it('renders Input with error', () => {
    render(<Input error="エラーです" />);
    expect(screen.getByText('エラーです')).toBeInTheDocument();
    expect(screen.getByTestId('input-error')).toBeInTheDocument();
});

// classNameが追加されるか
it('applies custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByTestId('input').className).toContain('custom-class');
});

// 入力イベントテスト
it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByTestId('input'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalled();
});
