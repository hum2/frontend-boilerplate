import React from 'react';
import { Input as ShadcnInput } from '@/components/shadcn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({
    label,
    error,
    id,
    className,
    ...props
}: InputProps) => {
    return (
        <div className="space-y-2">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <ShadcnInput
                id={id}
                className={`${className} ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                {...props}
                data-testid="input"
            />
            {error && (
                <p className="text-sm text-red-500" data-testid="input-error">
                    {error}
                </p>
            )}
        </div>
    );
};
