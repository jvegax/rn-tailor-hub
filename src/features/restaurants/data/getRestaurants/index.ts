import { storage } from '@/core/cache';
import { Props } from './types';
import { Restaurant } from '../../models';

// const CACHE_EXPIRATION = 600000; // 10 minutos
const CACHE_EXPIRATION = 60000; // 1 minuto
const API_URL = 'https://technical-review-api-tailor.netlify.app/api';

export const getRestaurants = async ({
    page,
    limit,
    fetchWithAuth,
}: Props): Promise<Restaurant> => {
    const cacheKey = `restaurants_list_${page}_${limit}`;
    const cachedStr = storage.getString(cacheKey);

    // Hay datos en cache
    if (cachedStr) {
        try {
            const parsed = JSON.parse(cachedStr);
            if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_EXPIRATION) {
                // Mapear la cache con el tipo de dato de fronted (Restaurant) usando "mapToRestaurant"
            }
        } catch (error) {
            console.error('Error al parsear la caché de restaurantes:', error);
        }
    }

    // No hay datos en cache
    const url = `${API_URL}/restaurant/list?limit=${limit}&page=${page}`;
    const response = await fetchWithAuth(url);
    if (!response.ok) {
        throw new Error('Error al obtener los restaurantes');
    }
    const data = await response.json();

    storage.set(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
    return data;
};
