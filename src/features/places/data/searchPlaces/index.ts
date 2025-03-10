import { SearchRestaurantResult } from '../../models';

const GOOGLE_PLACES_API_KEY = '';
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

export async function searchPlaces(query: string): Promise<SearchRestaurantResult[]> {
  const url = `${PLACES_API_URL}?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error en la búsqueda: ${response.status}`);
  }
  const data = await response.json();

  if (data.status !== 'OK' || !data.results) {
    throw new Error(`Error en la búsqueda: ${data.status}`);
  }

  const results: SearchRestaurantResult[] = data.results.map((result: any) => ({
    address: result.formatted_address,
    latlng: {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    },
  }));

  return results;
}
