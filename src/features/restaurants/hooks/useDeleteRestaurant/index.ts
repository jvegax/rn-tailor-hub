import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';
import { deleteRestaurant } from '../../data/deleteRestaurant';
import { queryClient } from '@/core/react-query/client';

type Props = {
    id: string
    onDeleteSuccess: () => void
};

export const useDeleteRestaurant = ({ id, onDeleteSuccess }: Props) => {
    const fetchWithAuth = useAuthFetch();
    return useMutation({
        mutationFn: () => deleteRestaurant({ id, fetchWithAuth }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getRestaurants'] });
            onDeleteSuccess();
        },
    });
};
