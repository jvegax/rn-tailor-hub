import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRestaurantSchema } from './schema';
import { z } from 'zod';
import { Platform } from 'react-native';

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

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();

        if (data.image) {
            const filename = data.image.split('/').pop() || 'image.jpg';
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1].toLowerCase()}` : 'image';

            const normalizedUri = Platform.OS === 'ios' ? data.image.replace('file://', '') : data.image;

            formData.append('image', {
                uri: normalizedUri,
                name: filename,
                type,
            } as any);
        }

        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('description', data.description);

        const API_URL = 'https://technical-review-api-tailor.netlify.app';

        const response = await fetch(`${API_URL}/restaurant/create`, {
            method: 'POST',
            body: formData,
            headers: {
                // "Authorization": `Bearer ${token}`,
            },
        });

        console.log('response', response);
        if (response.status !== 201) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el restaurante');
        }


        return response;
    });

    return {
        form,
        submitForm: onSubmit,
    };
};
