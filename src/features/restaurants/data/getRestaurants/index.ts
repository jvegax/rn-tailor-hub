import { Props } from './types';
import { Restaurant } from '../../models';
import { mapToRestaurant } from '../../models/mapToRestaurant';
import { API_URL } from '@/core/api';

export const getRestaurants = async ({
    page,
    limit,
    fetchWithAuth,
}: Props): Promise<Restaurant[]> => {
    const url = `${API_URL}/restaurant/list/?limit=${limit}&page=${page}`;
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        throw new Error('Error al obtener los restaurantes');
    }
    const data = await response.json();
    const restaurants: Restaurant[] = data.restaurantList.map(mapToRestaurant);
    return restaurants;
};
