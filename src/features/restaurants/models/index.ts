export interface Restaurant {
    id: number;
    name: string;
    neighborhood: string;
    photograph: string;
    address: string;
    latlng: LatLng;
    image: string;
    cuisine_type: string;
    operating_hours: OperatingHours;
    reviews: Review[];
}

export interface LatLng {
    lat: number;
    lng: number;
}

export type OperatingHours = {
    [day: string]: string;
};

export interface Review {
    name: string;
    date: string;
    rating: number;
    comments: string;
}
