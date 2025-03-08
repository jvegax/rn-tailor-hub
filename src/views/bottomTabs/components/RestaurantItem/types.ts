import { Restaurant } from '@/features/restaurants/models';

export type Props = {
    item: Restaurant;
    onPress: (id: number) => void;
};
