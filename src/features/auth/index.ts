import { storage } from '@/core/cache';

const API_BASE_URL = 'https://technical-review-api-tailor.netlify.app/api';

export async function login(email: string, password: string): Promise<{ token: string; refreshToken: string } | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            console.error('Error en la petición de login:', response.status);
            return null;
        }

        // Extrae el token del header "authorization"
        const token = response.headers.get('authorization');

        // Extrae el refreshToken del header "set-cookie"
        const setCookie = response.headers.get('set-cookie');
        let refreshToken = '';
        if (setCookie) {
            const match = setCookie.match(/refreshToken=([^;]+)/);
            if (match) {
                refreshToken = match[1];
            }
        }

        if (!token || !refreshToken) {
            console.error('Token o refreshToken no encontrados');
            return null;
        }

        // Persistir en MMKV
        storage.set('authToken', token);
        storage.set('refreshToken', refreshToken);

        return { token, refreshToken };
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}
