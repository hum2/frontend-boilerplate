"use client";

import React from 'react';
import {
    Select as ShadcnSelect,
    SelectContent as ShadcnSelectContent,
    SelectItem as ShadcnSelectItem,
    SelectTrigger as ShadcnSelectTrigger,
    SelectValue as ShadcnSelectValue
} from '@/components/shadcn';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export const Select = ({
    options,
    value,
    onChange,
    placeholder = '選択してください',
    label,
    error,
    disabled = false,
    className
}: SelectProps) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <ShadcnSelect
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                data-testid="select"
            >
                <ShadcnSelectTrigger className={`w-full ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className || ''}`}>
                    <ShadcnSelectValue placeholder={placeholder} />
                </ShadcnSelectTrigger>
                <ShadcnSelectContent>
                    {options.map((option) => (
                        <ShadcnSelectItem
                            key={option.value}
                            value={option.value}
                            data-testid={`select-option-${option.value}`}
                        >
                            {option.label}
                        </ShadcnSelectItem>
                    ))}
                </ShadcnSelectContent>
            </ShadcnSelect>
            {error && (
                <p className="text-sm text-red-500" data-testid="select-error">
                    {error}
                </p>
            )}
        </div>
    );
};
