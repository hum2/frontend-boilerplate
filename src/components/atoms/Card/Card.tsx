"use client";

import React, { ReactNode } from 'react';
import {
    Card as ShadcnCard,
    CardHeader as ShadcnCardHeader,
    CardTitle as ShadcnCardTitle,
    CardDescription as ShadcnCardDescription,
    CardContent as ShadcnCardContent,
    CardFooter as ShadcnCardFooter
} from '@/components/shadcn';

interface CardProps {
    title?: string;
    description?: string;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
}

export const Card = ({
    title,
    description,
    children,
    footer,
    className
}: CardProps) => {
    return (
        <ShadcnCard className={className} data-testid="card">
            {(title || description) && (
                <ShadcnCardHeader>
                    {title && <ShadcnCardTitle>{title}</ShadcnCardTitle>}
                    {description && <ShadcnCardDescription>{description}</ShadcnCardDescription>}
                </ShadcnCardHeader>
            )}
            <ShadcnCardContent>{children}</ShadcnCardContent>
            {footer && <ShadcnCardFooter>{footer}</ShadcnCardFooter>}
        </ShadcnCard>
    );
};
