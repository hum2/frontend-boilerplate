"use client";

import React, { createContext, useContext } from 'react';
import { createContainer, DIContainer } from './container';

const DIContext = createContext<DIContainer | null>(null);

export const DIProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const container = createContainer();

    return (
        <DIContext.Provider value={container}>
            {children}
        </DIContext.Provider>
    );
};

export const useDI = () => {
    const container = useContext(DIContext);
    if (!container) {
        throw new Error('useDI must be used within DIProvider');
    }
    return container;
};
