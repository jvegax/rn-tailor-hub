import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().max(128),
    password: z.string().min(6).max(128),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
