import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateRestaurantFormData, createRestaurantSchema } from './schema';
import { Platform } from 'react-native';
import { defaultRestaurantValues } from './mock';
import { Props, RestaurantForm } from './types';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';

const API_URL = 'https://technical-review-api-tailor.netlify.app/api';

export const useRestaurantForm = ({ navigation, restaurant, type }: Props): {
    form: RestaurantForm;
    submitForm: () => Promise<any>;
} => {
    const fetchWithAuth = useAuthFetch();

    const defaultValues = type === 'edit' && restaurant
        ? {
            name: restaurant.name,
            address: restaurant.address,
            description: restaurant.description,
            image: restaurant.image,
            latlng: restaurant.latlng,
        }
        : defaultRestaurantValues;

    const form = useForm<CreateRestaurantFormData>({
        resolver: zodResolver(createRestaurantSchema),
        defaultValues,
    });

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            const formData = new FormData();
            if (data.image) {
                const filename = data.image.split('/').pop() ?? 'image.jpg';
                const match = /\.(\w+)$/.exec(filename);
                const mimeType = match ? `image/${match[1].toLowerCase()}` : 'image';
                const normalizedUri =
                    Platform.OS === 'ios' ? data.image.replace('file://', '') : data.image;

                formData.append('image', {
                    uri: normalizedUri,
                    name: filename,
                    type: mimeType,
                } as any);
            }

            formData.append('name', data.name);
            formData.append('address', data.address);
            formData.append('description', data.description);
            formData.append('latlng[lat]', data.latlng.lat.toString());
            formData.append('latlng[lng]', data.latlng.lng.toString());

            let url = `${API_URL}/restaurant/create`;
            let expectedStatus = 201;

            if (type === 'edit') {
                url = `${API_URL}/restaurant/${restaurant?.id}`;
                expectedStatus = 202;
            }

            const options: RequestInit = {
                method: type === 'edit' ? 'PUT' : 'POST',
                body: formData,
            };

            const response = await fetchWithAuth(url, options);

            if (response.status !== expectedStatus) {
                navigation.navigate('CreateRestaurantResultScreen', { status: 'error' });
                return;
            }

            navigation.navigate('CreateRestaurantResultScreen', { status: 'success' });
        } catch (error: any) {
            navigation.navigate('CreateRestaurantResultScreen', { status: 'error' });
        }
    });

    return {
        form,
        submitForm: onSubmit,
    };
};
