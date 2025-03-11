import { useQuery } from '@tanstack/react-query';
import type { NetworkData } from '@/common/domain/NetworkData/types';
import { useMemo } from 'react';
import { getRestaurants } from '../../data/getRestaurants';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';
import { Restaurant } from '@/features/restaurants/models';

type Props = {
    page: number;
    limit: number;
};

export const useGetRestaurants = ({
    page,
    limit,
}: Props) => {
    const fetchWithAuth = useAuthFetch();
    const { data, isLoading, isError, refetch, isRefetchError, isRefetching } = useQuery<Restaurant[]>({
        queryKey: ['getRestaurants', page, limit],
        queryFn: () => getRestaurants({ page, limit, fetchWithAuth }),
    });

    const networkData = useMemo<NetworkData<Restaurant[]>>(() => {
        if (isLoading || isRefetching) {
            return { type: 'loading' };
        }

        if (isError || !data || isRefetchError) {
            console.log('Error al obtener los restaurantes', { isError, data, isRefetchError });
            return { type: 'error', message: 'Error al obtener los restaurantes' };
        }

        return { type: 'data', data };
    }, [data, isLoading, isError, isRefetchError, isRefetching]);

    return { data: networkData, refetch };
};
