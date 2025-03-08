import { Restaurant } from '@/features/restaurants/models';

export type Props = {
    restaurant: Restaurant;
    goBack: () => void;
};
