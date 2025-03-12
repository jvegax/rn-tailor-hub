import { useInfiniteQuery } from '@tanstack/react-query';
import type { NetworkData } from '@/common/domain/NetworkData/types';
import { useMemo } from 'react';
import { getRestaurants } from '../../data/getRestaurants';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';
import { Restaurant } from '@/features/restaurants/models';

export const useGetRestaurants = () => {
    const fetchWithAuth = useAuthFetch();
    const {
        data,
        error,
        isError,
        isFetching,
        isRefetching,
        isRefetchError,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
    } = useInfiniteQuery<Restaurant[], Error>({
        queryKey: ['getRestaurants'],
        queryFn: ({ pageParam = 1 }) =>
            getRestaurants({ page: pageParam as number, limit: 10, fetchWithAuth }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam: any) => {
            return lastPage.length === 10 ? lastPageParam + 1 : undefined;
        },
    });

    const networkData = useMemo<NetworkData<Restaurant[]>>(() => {
        const restaurants = data ? data.pages.flat() : [];

        if ((isFetching || isRefetching) && !isFetchingNextPage) {
            return { type: 'loading' };
        }
        if (error || isError || !restaurants || isRefetchError) {
            return { type: 'error', message: 'Error al obtener los restaurantes' };
        }
        return { type: 'data', data: restaurants };
    }, [data, isFetching, isError, error, isRefetching, isRefetchError, isFetchingNextPage]);

    return { data: networkData, fetchNextPage, hasNextPage, isFetchingNextPage, refetch };
};
