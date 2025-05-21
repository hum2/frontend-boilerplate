import React from 'react';
import {
    Tooltip as ShadcnTooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from '@/components/shadcn';

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    delayDuration?: number;
    className?: string;
    contentClassName?: string;
}

export const Tooltip = ({
    children,
    content,
    side = 'top',
    align = 'center',
    delayDuration = 300,
    className,
    contentClassName
}: TooltipProps) => {
    return (
        <TooltipProvider delayDuration={delayDuration}>
            <ShadcnTooltip>
                <TooltipTrigger asChild className={className} data-testid="tooltip-trigger">
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={side}
                    align={align}
                    className={contentClassName}
                    data-testid="tooltip-content"
                >
                    {content}
                </TooltipContent>
            </ShadcnTooltip>
        </TooltipProvider>
    );
};
