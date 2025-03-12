import { useQuery } from '@tanstack/react-query';
import { getRestaurantById } from '../../data/getRestaurantById';
import { NetworkData } from '@/common/domain/NetworkData/types';
import { Restaurant } from '../../models';
import { useMemo } from 'react';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';

export const useGetRestaurantById = (id: string) => {
    const fetchWithAuth = useAuthFetch();
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['getRestaurantById', id, fetchWithAuth],
        queryFn: () => getRestaurantById({ id, fetchWithAuth }),
        enabled: !!id,
    });

    const networkData = useMemo<NetworkData<Restaurant>>(() => {
        if (isLoading) {
            return { type: 'loading' };
        }

        if (isError || !data) {
            return {
                type: 'error',
                message: 'Error al obtener el restaurante',
            };
        }

        return { type: 'data', data };
    }, [data, isLoading, isError]);

    return { data: networkData };
};
