import { Restaurant } from '@/features/restaurants/models';

export type Props = {
    restaurantId: string
    reviews: Restaurant['reviews']
    refetch: () => void
}
