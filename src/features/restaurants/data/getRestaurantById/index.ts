import { FetchWithAuth } from '@/features/auth/hooks/useAuthFetch';
import { Restaurant } from '../../models';
import { mapToRestaurantDetails } from '../../models/mapToRestaurantDetails';

const API_URL = 'https://technical-review-api-tailor.netlify.app/api';

type Props = {
    id: string;
    fetchWithAuth: FetchWithAuth
};

export const getRestaurantById = async ({
    id,
    fetchWithAuth,
}: Props): Promise<Restaurant> => {
    const url = `${API_URL}/restaurant/detail/${id}`;
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        throw new Error('Error al obtener el restaurante');
    }
    const data = await response.json();
    const restaurant: Restaurant = mapToRestaurantDetails(data);
    return restaurant;
};
