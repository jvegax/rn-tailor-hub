import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';
import { ReviewFormData, reviewFormSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { defaultValues } from './mock';
import { Props } from './types';

const API_URL = 'https://technical-review-api-tailor.netlify.app/api';

export const useReviewForm = ({ restaurantId, refetch }: Props) => {
    const fetchWithAuth = useAuthFetch();
    const form = useForm<ReviewFormData>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = form.handleSubmit(async (data) => {
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
            form.reset(defaultValues);
            refetch();
        }
    });

    return { form, onSubmit };
};
