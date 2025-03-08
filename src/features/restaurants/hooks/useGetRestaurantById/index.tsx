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
        if (isLoading) {
            const loading: NetworkData<Restaurant> = { type: 'loading' };
            return loading;
        }

        if (isError || !data) {
            const error: NetworkData<Restaurant> = {
                type: 'error',
                message: 'Error al obtener el restaurante',
            };
            return error;
        }

        const restaurant: NetworkData<Restaurant> = {
            type: 'data',
            data,
        };
        return restaurant;
    }, [data, isLoading, isError]);

    return networkData;
};
