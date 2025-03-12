import { API_URL } from '@/core/api';
import { FetchWithAuth } from '@/features/auth/hooks/useAuthFetch';

type Props = {
    id: string;
    fetchWithAuth: FetchWithAuth;
};

export const deleteRestaurant = async ({
    id,
    fetchWithAuth,
}: Props): Promise<void> => {
    const url = `${API_URL}/restaurant/${id}`;
    const response = await fetchWithAuth(url, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el restaurante');
    }
};
