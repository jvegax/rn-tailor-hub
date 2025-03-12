import { useQuery } from '@tanstack/react-query';
import { getRestaurantById } from '../../data/getRestaurantById';
import { NetworkData } from '@/common/domain/NetworkData/types';
import { Restaurant } from '../../models';
import { useMemo } from 'react';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';

type Props = {
    id: string
};
export const useGetRestaurantById = ({ id }: Props) => {
    const fetchWithAuth = useAuthFetch();
    const {
        data,
        isLoading,
        isError,
        refetch,
        isRefetching,
        isRefetchError,
    } = useQuery({
        queryKey: ['getRestaurantById', id, fetchWithAuth],
        queryFn: () => getRestaurantById({ id, fetchWithAuth }),
        enabled: !!id,
    });

    const networkData = useMemo<NetworkData<Restaurant>>(() => {
        if (isLoading || isRefetching) {
            return { type: 'loading' };
        }

        if (isError || !data || isRefetchError) {
            return {
                type: 'error',
                message: 'Error al obtener el restaurante',
            };
        }

        return { type: 'data', data };
    }, [data, isLoading, isError, isRefetching, isRefetchError]);

    return { data: networkData, refetch };
};
