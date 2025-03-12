import { z } from 'zod';

export const reviewFormSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string()
        .min(10, { message: 'El comentario debe tener al menos 10 caracteres' })
        .max(255, { message: 'El comentario no puede superar los 255 caracteres' }),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;
