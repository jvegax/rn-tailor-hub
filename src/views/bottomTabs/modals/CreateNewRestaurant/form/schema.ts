import { z } from 'zod';

export const createRestaurantSchema = z.object({
    image: z.string(),
    name: z.string(),
    address: z.string(),
    latlng: z.object({
        lat: z.number(),
        lng: z.number(),
    }),
    description: z.string().max(255, {
        message: 'La descripción debe tener máximo 255 caracteres',
    }).min(10, {
        message: 'La descripción debe tener mínimo 10 caracteres',
    }),
});
