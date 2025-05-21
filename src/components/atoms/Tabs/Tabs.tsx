import React from 'react';
import {
    Tabs as ShadcnTabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from '@/components/shadcn';

export interface TabItem {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
}

interface TabsProps {
    items: TabItem[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    tabsListClassName?: string;
    tabsContentClassName?: string;
}

export const Tabs = ({
    items,
    defaultValue,
    value,
    onValueChange,
    className,
    tabsListClassName,
    tabsContentClassName
}: TabsProps) => {
    // デフォルト値が指定されていない場合は最初のタブを選択
    const initialValue = defaultValue || value || items[0]?.value;

    return (
        <ShadcnTabs
            defaultValue={defaultValue}
            value={value}
            onValueChange={onValueChange}
            className={className}
            data-testid="tabs"
        >
            <TabsList className={tabsListClassName}>
                {items.map((item) => (
                    <TabsTrigger
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {item.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {items.map((item) => (
                <TabsContent
                    key={item.value}
                    value={item.value}
                    className={tabsContentClassName}
                >
                    {item.content}
                </TabsContent>
            ))}
        </ShadcnTabs>
    );
};
