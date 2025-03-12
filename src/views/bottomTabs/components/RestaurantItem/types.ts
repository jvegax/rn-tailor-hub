import { Restaurant } from '@/features/restaurants/models';

export type Props = {
    index: number;
    item: Restaurant;
    onPress: () => void;
};
