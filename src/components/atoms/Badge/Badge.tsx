import React from 'react';
import { Badge as ShadcnBadge } from '@/components/shadcn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
}

export const Badge = ({
    children,
    variant = 'default',
    className
}: BadgeProps) => {
    return (
        <ShadcnBadge
            variant={variant}
            className={className}
            data-testid="badge"
        >
            {children}
        </ShadcnBadge>
    );
};
