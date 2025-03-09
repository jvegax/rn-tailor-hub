import { z } from 'zod';

export const createRestaurantSchema = z.object({
    image: z.string(),
    name: z.string(),
    address: z.string(),
    description: z.string().max(500, {
        message: 'La descripción debe tener máximo 500 caracteres',
    }),
});
