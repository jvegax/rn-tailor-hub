import { Restaurant } from '../../models';

export const getRestaurantById = async (id: string): Promise<Restaurant | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({} as Restaurant);
        }, 1000);
    });
};
