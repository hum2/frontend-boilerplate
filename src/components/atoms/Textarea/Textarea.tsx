import React from 'react';
import { Textarea as ShadcnTextarea } from '@/components/shadcn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = ({
    label,
    error,
    id,
    className,
    ...props
}: TextareaProps) => {
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
            <ShadcnTextarea
                id={id}
                className={`${className || ''} ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                {...props}
                data-testid="textarea"
            />
            {error && (
                <p className="text-sm text-red-500" data-testid="textarea-error">
                    {error}
                </p>
            )}
        </div>
    );
};
