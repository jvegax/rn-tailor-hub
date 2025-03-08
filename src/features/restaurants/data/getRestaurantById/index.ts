import Config from 'react-native-config';
import { MOCK_RESTAURANTS } from '../../mock';
import { Restaurant } from '../../models';

export const getRestaurantById = async (id: number): Promise<Restaurant | undefined> => {
    console.log(`${Config.API_URL}/restaurants/${id}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            const restaurant = MOCK_RESTAURANTS.find((item) => item.id === id);
            resolve(restaurant);
        }, 1000);
    });
};
