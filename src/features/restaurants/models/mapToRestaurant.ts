import { Restaurant } from '@/features/restaurants/models';

export function mapToRestaurant(data: any): Restaurant {
    return {
        id: data._id ?? '',
        name: data.name ?? '',
        owner: data.owner ?? '',
        address: data.address ?? '',
        latlng: {
            lat: data.latlng?.lat ?? 0,
            lng: data.latlng?.lng ?? 0,
        },
        image: data.image ?? '',
        reviews: Array.isArray(data.reviews)
            ? data.reviews.map((review: any) => ({
                id: review._id ?? '',
                owner: review.owner ?? '',
                rating: review.rating ?? 0,
                comment: review.comment ?? '',
                date: review.date ?? '',
            }))
            : [],
        createdAt: data.createdAt ?? '',
        updatedAt: data.updatedAt ?? '',
        avgRating: data.avgRating ?? 0,
    };
}
