import { SearchRestaurantResult } from '../../models';
import Config from 'react-native-config';

const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

export async function searchPlaces(query: string): Promise<SearchRestaurantResult[]> {
  const GOOGLE_PLACES_API_KEY = Config.GOOGLE_PLACES_API_KEY;
  const url = `${PLACES_API_URL}?query=${encodeURIComponent(query)}&key=${GOOGLE_PLACES_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error en la búsqueda: ${response.status}`);
  }
  const data = await response.json();

  if (data.status !== 'OK' || !data.results) {
    return [];
  }

  const results: SearchRestaurantResult[] = data.results.map((result: any) => ({
    name: result.name,
    address: result.formatted_address,
    latlng: {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    },
  }));

  return results;
}
