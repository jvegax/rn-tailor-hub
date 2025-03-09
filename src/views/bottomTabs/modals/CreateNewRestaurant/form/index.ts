import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRestaurantSchema } from './schema';
import { z } from 'zod';

export type CreateRestaurantFormData = z.infer<typeof createRestaurantSchema>;

export const useRestaurantForm = () => {
    const form = useForm<CreateRestaurantFormData>({
        resolver: zodResolver(createRestaurantSchema),
        defaultValues: {
            image: '',
            name: '',
            address: '',
            description: '',
        },
    });

    const submitForm = form.handleSubmit(() => { });

    return {
        form,
        submitForm,
    };
};
