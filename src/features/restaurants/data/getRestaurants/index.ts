import { Restaurant } from '@/features/restaurants/models';
import { storage } from '@/core/cache';

export interface GetRestaurantsResponse {
    restaurantList: Restaurant[];
    total: number;
}

const CACHE_EXPIRATION = 600000;

export const getRestaurants = async ({
    page,
    limit,
}: { page: number, limit: number }): Promise<GetRestaurantsResponse> => {
    const cacheKey = `restaurants_list_${page}_${limit}`;
    const cachedStr = storage.getString(cacheKey);

    if (cachedStr) {
        try {
            const parsed = JSON.parse(cachedStr);
            if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_EXPIRATION) {
                return parsed.data as GetRestaurantsResponse;
            }
        } catch (error) {
            console.error('Error al parsear la caché de restaurantes:', error);
        }
    }

    const API_URL = 'https://default-api-url.com';
    const url = `${API_URL}/restaurant/list?limit=${limit}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error al obtener los restaurantes');
    }
    const data: GetRestaurantsResponse = await response.json();

    storage.set(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
    return data;
};
