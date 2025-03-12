import { Props } from './types';
import { Restaurant } from '../../models';
import { mapToRestaurant } from '../../models/mapToRestaurant';

const API_URL = 'https://technical-review-api-tailor.netlify.app/api/restaurant/list';

export const getRestaurants = async ({
    page,
    limit,
    fetchWithAuth,
}: Props): Promise<Restaurant[]> => {
    const url = `${API_URL}/?limit=${limit}&page=${page}`;
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        throw new Error('Error al obtener los restaurantes');
    }
    const data = await response.json();
    const restaurants: Restaurant[] = data.restaurantList.map(mapToRestaurant);
    return restaurants;
};
