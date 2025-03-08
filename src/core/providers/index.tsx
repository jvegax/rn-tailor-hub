import { QueryProvider } from '../react-query/provider';
import { FC } from 'react';

type Props = { children: React.ReactNode }

export const AppProviders: FC<Props> = ({ children }) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    );
};
