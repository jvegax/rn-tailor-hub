import { QueryProvider } from '../react-query/provider';
import { FC } from 'react';
import { FavoritesProvider } from './favourites';
import { AuthProvider } from './auth';
import { PortalProvider } from '@gorhom/portal';

type Props = { children: React.ReactNode }

export const AppProviders: FC<Props> = ({ children }) => {
    return (
        <QueryProvider>
            <AuthProvider>
                <FavoritesProvider>
                    <PortalProvider>
                        {children}
                    </PortalProvider>
                </FavoritesProvider>
            </AuthProvider>
        </QueryProvider>
    );
};
