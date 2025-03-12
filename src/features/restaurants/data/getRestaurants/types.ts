import { FetchWithAuth } from '@/features/auth/hooks/useAuthFetch';

export type Props = {
    page: number;
    limit: number;
    fetchWithAuth: FetchWithAuth;
}
