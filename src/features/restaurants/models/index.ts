export interface Restaurant {
    id: string;
    name: string;
    owner: string;
    address: string;
    latlng: LatLng;
    image: string;
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
    avgRating: number;
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface Review {
    id: string;
    owner: string;
    rating: number;
    comment: string;
    date: string;
}
