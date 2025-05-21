import React from 'react';
import {
    Table as ShadcnTable,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption
} from '@/components/shadcn';

export interface TableColumn<T> {
    header: React.ReactNode;
    accessor: keyof T | ((data: T) => React.ReactNode);
    className?: string;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    caption?: string;
    footer?: React.ReactNode;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    rowClassName?: (row: T, index: number) => string | undefined;
}

export function Table<T extends Record<string, any>>({
    data,
    columns,
    caption,
    footer,
    className,
    headerClassName,
    bodyClassName,
    rowClassName
}: TableProps<T>) {
    return (
        <ShadcnTable className={className} data-testid="table">
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader className={headerClassName}>
                <TableRow>
                    {columns.map((column, i) => (
                        <TableHead key={i} className={column.className}>
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className={bodyClassName}>
                {data.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        className={rowClassName ? rowClassName(row, rowIndex) : undefined}
                    >
                        {columns.map((column, colIndex) => (
                            <TableCell key={colIndex} className={column.className}>
                                {typeof column.accessor === 'function'
                                    ? column.accessor(row)
                                    : row[column.accessor]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            {footer && (
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length}>{footer}</TableCell>
                    </TableRow>
                </TableFooter>
            )}
        </ShadcnTable>
    );
}
