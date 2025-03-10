export type SearchRestaurantResult = {
    name: string;
    address: string;
    latlng: {
        lat: number;
        lng: number;
    };
};
