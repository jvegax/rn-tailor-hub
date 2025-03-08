import { MOCK_RESTAURANTS } from '../../mock';
import { Restaurant } from '../../models';

export const getRestaurantById = async (id: number): Promise<Restaurant | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const restaurant = MOCK_RESTAURANTS.find((item) => item.id === id);
            resolve(restaurant);
        }, 1000);
    });
};
