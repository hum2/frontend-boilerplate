import React, { ReactNode } from 'react';
import {
    Alert as ShadcnAlert,
    AlertTitle as ShadcnAlertTitle,
    AlertDescription as ShadcnAlertDescription
} from '@/components/shadcn';
import {
    AlertCircle,
    CheckCircle,
    XCircle,
    Info
} from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
    title?: string;
    children: ReactNode;
    variant?: AlertVariant;
    className?: string;
}

export const Alert = ({
    title,
    children,
    variant = 'info',
    className
}: AlertProps) => {
    const variantClassMap: Record<AlertVariant, string> = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800'
    };

    const iconMap: Record<AlertVariant, ReactNode> = {
        info: <Info className="h-5 w-5 text-blue-500" />,
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />
    };

    return (
        <ShadcnAlert
            className={`flex ${variantClassMap[variant]} ${className || ''}`}
            data-testid="alert"
            data-variant={variant}
        >
            <div className="mr-3 flex-shrink-0">
                {iconMap[variant]}
            </div>
            <div>
                {title && <ShadcnAlertTitle>{title}</ShadcnAlertTitle>}
                <ShadcnAlertDescription>{children}</ShadcnAlertDescription>
            </div>
        </ShadcnAlert>
    );
};
