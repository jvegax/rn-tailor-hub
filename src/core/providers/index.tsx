import { QueryProvider } from '../react-query/provider';
import { FC } from 'react';
import { FavoritesProvider } from './favourites';

type Props = { children: React.ReactNode }

export const AppProviders: FC<Props> = ({ children }) => {
    return (
        <QueryProvider>
            <FavoritesProvider>
                {children}
            </FavoritesProvider>
        </QueryProvider>
    );
};
