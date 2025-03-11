import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateRestaurantFormData, createRestaurantSchema } from './schema';
import { Platform, Alert } from 'react-native';
import { defaultRestaurantValues } from './mock';
import { storage } from '@/core/cache';

export type RestaurantForm = UseFormReturn<CreateRestaurantFormData>;

export const useRestaurantForm = (): {
    form: RestaurantForm;
    submitForm: () => Promise<any>;
} => {
    const form = useForm<CreateRestaurantFormData>({
        resolver: zodResolver(createRestaurantSchema),
        defaultValues: defaultRestaurantValues,
    });

    const onSubmit = form.handleSubmit(async (data) => {
        try {
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

            const token = storage.getString('authToken') || '';
            const API_URL = 'https://technical-review-api-tailor.netlify.app/api';
            const response = await fetch(`${API_URL}/restaurant/create`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status !== 201) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el restaurante');
            }

            // Supongamos que la respuesta incluye el id del restaurante creado
            const result = await response.json().catch(() => ({}));
            return result;
        } catch (error) {
            Alert.alert('Error al crear el restaurante');
            throw error;
        }
    });

    return {
        form,
        submitForm: onSubmit,
    };
};
