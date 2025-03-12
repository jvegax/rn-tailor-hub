import { User } from '@/features/auth/models';
import { Review } from '@/features/restaurants/models';

export type Props = {
    userData: User | null
    index: number
    showSeparator: boolean
    review: Review
    restaurantId: string
    refetch: () => void
}
