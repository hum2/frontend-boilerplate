import React from 'react';
import { Avatar as ShadcnAvatar, AvatarImage, AvatarFallback } from '@/components/shadcn';

interface AvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    className?: string;
}

export const Avatar = ({
    src,
    alt = '',
    fallback,
    className
}: AvatarProps) => {
    return (
        <ShadcnAvatar className={className} data-testid="avatar">
            {src && <AvatarImage src={src} alt={alt} />}
            <AvatarFallback>{fallback}</AvatarFallback>
        </ShadcnAvatar>
    );
};
