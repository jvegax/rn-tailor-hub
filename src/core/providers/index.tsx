import { QueryProvider } from '../react-query/provider';
import { FC } from 'react';
import { FavoritesProvider } from './favourites';
import { AuthProvider } from './auth';

type Props = { children: React.ReactNode }

export const AppProviders: FC<Props> = ({ children }) => {
    return (
        <QueryProvider>
            <AuthProvider>
                <FavoritesProvider>
                    {children}
                </FavoritesProvider>
            </AuthProvider>
        </QueryProvider>
    );
};
