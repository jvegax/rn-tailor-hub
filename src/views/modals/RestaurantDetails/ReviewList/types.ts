import { Restaurant } from '@/features/restaurants/models';

export type Props = {
    reviews: Restaurant['reviews']
    refetch: () => void
}
