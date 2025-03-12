import { API_URL } from '@/core/api';
import { FetchWithAuth } from '@/features/auth/hooks/useAuthFetch';

type Props = {
    restaurantId: string;
    commentId: string;
    fetchWithAuth: FetchWithAuth;
};

export const deleteComment = async ({
    restaurantId,
    commentId,
    fetchWithAuth,
}: Props): Promise<void> => {
    const url = `${API_URL}/restaurant/${restaurantId}/comment/${commentId}`;
    const response = await fetchWithAuth(url, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el restaurante');
    }
};
