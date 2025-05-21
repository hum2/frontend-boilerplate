import React from 'react';
import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel
} from '@/components/shadcn';

export interface DropdownMenuItemType {
    label: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
    className?: string;
    type?: 'item' | 'separator' | 'label';
}

interface DropdownMenuProps {
    trigger: React.ReactNode;
    items: DropdownMenuItemType[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    align?: 'start' | 'center' | 'end';
    className?: string;
    triggerClassName?: string;
}

export const DropdownMenu = ({
    trigger,
    items,
    open,
    onOpenChange,
    align = 'end',
    className,
    triggerClassName
}: DropdownMenuProps) => {
    return (
        <ShadcnDropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild className={triggerClassName} data-testid="dropdown-trigger">
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className={className} data-testid="dropdown-content">
                {items.map((item, index) => {
                    if (item.type === 'separator') {
                        return <DropdownMenuSeparator key={index} className={item.className} />;
                    }

                    if (item.type === 'label') {
                        return (
                            <DropdownMenuLabel key={index} className={item.className}>
                                {item.label}
                            </DropdownMenuLabel>
                        );
                    }

                    return (
                        <DropdownMenuItem
                            key={index}
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={item.className}
                        >
                            {item.icon && <span className="mr-2">{item.icon}</span>}
                            {item.label}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    );
};
