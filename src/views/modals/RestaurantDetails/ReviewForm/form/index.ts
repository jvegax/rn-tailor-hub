import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';
import { ReviewFormData, reviewFormSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues } from './mock';

const API_URL = 'https://technical-review-api-tailor.netlify.app/api';

type Props = { restaurantId: string };

export const useReviewForm = ({ restaurantId }: Props) => {
    const fetchWithAuth = useAuthFetch();
    const form = useForm<ReviewFormData>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = form.handleSubmit(async (data) => {
        try {
            const url = `${API_URL}/restaurant/${restaurantId}/comment`;
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: data.rating,
                    comment: data.comment,
                }),
            };
            const response = await fetchWithAuth(url, options);

            if (response.status === 201) {
                // actualizar reviews ref

                form.reset(defaultValues);
            } else {
                console.error('Error creating review:', response.statusText);
            }

        } catch (error: any) {
            console.error('Error creating review:', error.message);
        }
    });

    return { form, onSubmit };
};
