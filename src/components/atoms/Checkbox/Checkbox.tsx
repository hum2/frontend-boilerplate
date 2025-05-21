import React from 'react';
import { Checkbox as ShadcnCheckbox } from '@/components/shadcn';

interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
}

export const Checkbox = ({
    checked,
    onCheckedChange,
    label,
    disabled = false,
    className,
    id
}: CheckboxProps) => {
    return (
        <div className="flex items-center space-x-2">
            <ShadcnCheckbox
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                className={className}
                data-testid="checkbox"
            />
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700 select-none"
                >
                    {label}
                </label>
            )}
        </div>
    );
};
