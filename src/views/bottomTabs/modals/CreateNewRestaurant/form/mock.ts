import { CreateRestaurantFormData } from './schema';

export const defaultRestaurantValues: CreateRestaurantFormData = {
    image: '',
    name: '',
    address: '',
    description: '',
    latlng: {
        lat: 0,
        lng: 0,
    },
};
