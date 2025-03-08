import { useQuery } from '@tanstack/react-query';
import { getRestaurantById } from '../../data/getRestaurantById';
import { NetworkData } from '@/common/domain/NetworkData/types';
import { Restaurant } from '../../models';
import { useMemo } from 'react';

export const useGetRestaurantById = (id: number): NetworkData<Restaurant> => {
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['getRestaurantById', id],
        queryFn: () => getRestaurantById(id),
        enabled: !!id,
    });

    const networkData = useMemo(() => {
        if (!data?.id || isError) {
            const error: NetworkData<Restaurant> = {
                type: 'error',
                message: 'Error al obtener el restaurante',
            };
            return error;
        }

        if (isLoading) {
            const loading: NetworkData<Restaurant> = {
                type: 'loading',
            };
            return loading;
        }

        const restaurant: NetworkData<Restaurant> = {
            type: 'data',
            data,
        };
        return restaurant;
    }, [data, isLoading, isError]);

    return networkData;
};
