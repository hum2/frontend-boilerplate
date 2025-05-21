"use client";
import { type FC } from "react";

type Props = { visitCount: number };

export const CounterPageClient: FC<Props> = ({ visitCount }) => {
    return (
        <div>
            <h1>訪問者カウント（App Router）</h1>
            <strong>{visitCount}</strong>
        </div>
    );
};
