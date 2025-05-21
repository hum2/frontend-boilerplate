import React from 'react';
import {
    Dialog as ShadcnDialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/shadcn';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export const Dialog = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    className
}: DialogProps) => {
    return (
        <ShadcnDialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={className} data-testid="dialog">
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}
                <div>{children}</div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </ShadcnDialog>
    );
};
