import React from 'react';
import {
    Popover as ShadcnPopover,
    PopoverContent,
    PopoverTrigger
} from '@/components/shadcn';

interface PopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    className?: string;
    triggerClassName?: string;
}

export const Popover = ({
    trigger,
    children,
    open,
    onOpenChange,
    side = 'bottom',
    align = 'center',
    className,
    triggerClassName
}: PopoverProps) => {
    return (
        <ShadcnPopover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild className={triggerClassName} data-testid="popover-trigger">
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                side={side}
                align={align}
                className={className}
                data-testid="popover-content"
            >
                {children}
            </PopoverContent>
        </ShadcnPopover>
    );
};
