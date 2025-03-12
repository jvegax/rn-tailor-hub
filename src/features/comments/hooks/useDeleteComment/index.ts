import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@/features/auth/hooks/useAuthFetch';
import { deleteComment } from '../../data/deleteComment';

type Props = {
    restaurantId: string;
    commentId: string;
    onDeleteSuccess: () => void
};

export const useDeleteComment = ({
    restaurantId,
    commentId,
    onDeleteSuccess,
}: Props) => {
    const fetchWithAuth = useAuthFetch();
    return useMutation({
        mutationFn: () => deleteComment({
            restaurantId,
            commentId,
            fetchWithAuth,
        }),
        onSuccess: () => onDeleteSuccess(),
    });
};
