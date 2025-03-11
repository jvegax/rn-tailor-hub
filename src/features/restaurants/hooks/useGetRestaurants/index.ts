import { useQuery } from '@tanstack/react-query';
import { NetworkData } from '@/common/domain/NetworkData/types';
import { useMemo } from 'react';
import { getRestaurants } from '../../data/getRestaurants';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';
import { Restaurant } from '../../models';

type Props = {
    page: number;
    limit: number;
};

export const useGetRestaurants = ({
    page,
    limit,
}: Props) => {
    const fetchWithAuth = useAuthFetch();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getRestaurants', page, limit],
        queryFn: () => getRestaurants({ page, limit, fetchWithAuth }),
    });

    const networkData = useMemo(() => {
        if (isLoading) {
            const loading: NetworkData<Restaurant> = {
                type: 'loading',
            };
            return loading;
        }

        if (isError || !data) {
            const error: NetworkData<Restaurant> = {
                type: 'error',
                message: 'Error al obtener los restaurantes',
            };
            return error;
        }

        const restaurantData: NetworkData<Restaurant> = {
            type: 'data',
            data,
        };
        return restaurantData;
    }, [data, isLoading, isError]);

    return networkData;
};
