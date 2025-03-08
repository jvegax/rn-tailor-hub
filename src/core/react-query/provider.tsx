import React, { FC } from 'react';
import {
    QueryClientProvider,
} from '@tanstack/react-query';
import { queryClient } from './client';

type Props = { children: React.ReactNode }

export const QueryProvider: FC<Props> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    );
};
