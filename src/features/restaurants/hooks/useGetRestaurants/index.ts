import { useQuery } from '@tanstack/react-query';
import { NetworkData } from '@/common/domain/NetworkData/types';
import { useMemo } from 'react';
import { getRestaurants, GetRestaurantsResponse } from '../../data/getRestaurants';

type Props = {
    page: number;
    limit: number;
};

export const useGetRestaurants = ({
    page,
    limit,
}: Props): NetworkData<GetRestaurantsResponse> => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getRestaurants', page, limit],
        queryFn: () => getRestaurants({ page, limit }),
    });

    const networkData = useMemo(() => {
        if (isLoading) {
            const loading: NetworkData<GetRestaurantsResponse> = { type: 'loading' };
            return loading;
        }

        if (isError || !data) {
            const error: NetworkData<GetRestaurantsResponse> = {
                type: 'error',
                message: 'Error al obtener los restaurantes',
            };
            return error;
        }

        const restaurantData: NetworkData<GetRestaurantsResponse> = {
            type: 'data',
            data,
        };
        return restaurantData;
    }, [data, isLoading, isError]);

    return networkData;
};
