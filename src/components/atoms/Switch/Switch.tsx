import React from 'react';
import { Switch as ShadcnSwitch } from '@/components/shadcn';

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export const Switch = ({
    checked,
    onCheckedChange,
    label,
    disabled = false,
    className
}: SwitchProps) => {
    return (
        <div className="flex items-center space-x-2">
            <ShadcnSwitch
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                className={className}
                data-testid="switch"
            />
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
        </div>
    );
};
