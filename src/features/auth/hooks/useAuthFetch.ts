import { useAuth } from '@/core/providers/auth';
import { authFetch } from '../data';

export function useAuthFetch() {
    const { logout: logoutHandler } = useAuth();

    const fetchWithAuth = async (url: string, options: RequestInit) => {
        return await authFetch({ url, options, logoutHandler });
    };

    return fetchWithAuth;
}
