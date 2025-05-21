"use client";

import React from 'react';
import { Button as ShadcnButton, buttonVariants, type ButtonProps as ShadcnButtonProps } from '@/components/shadcn';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export const Button = ({
    label,
    onClick,
    variant = 'primary',
    disabled = false
}: ButtonProps) => {
    // shadcnのvariantにマッピング
    const variantMapping = {
        primary: 'default',
        secondary: 'secondary'
    } as const;

    // shadcnボタンに渡すvariant
    const shadcnVariant = variantMapping[variant];

    return (
        <ShadcnButton
            onClick={onClick}
            disabled={disabled}
            variant={shadcnVariant}
            data-testid="button"
        >
            {label}
        </ShadcnButton>
    );
};
