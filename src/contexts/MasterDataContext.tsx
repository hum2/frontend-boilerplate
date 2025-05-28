"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { MasterDataResponse } from '@/fetcher/masterData';

// マスターデータContext
const MasterDataContext = createContext<MasterDataResponse[] | null>(null);

export const useMasterData = () => {
    const ctx = useContext(MasterDataContext);
    if (!ctx) throw new Error('MasterDataContext が Provider により囲まれていません');

    return useMemo(() => ctx, [ctx]);
};

export const MasterDataProvider = ({ children, value }: { children: React.ReactNode; value: MasterDataResponse[] }) => {
    const memoizedValue = useMemo(() => value, [value]);

    return React.createElement(MasterDataContext.Provider, { value: memoizedValue }, children);
};
