import { storage } from '@/core/cache';

const API_BASE_URL = 'https://technical-review-api-tailor.netlify.app';

type LoginResponse = { token: string; refreshToken: string } | null;

export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

        const token = response.headers.get('authorization');

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

        storage.set('authToken', token);
        storage.set('refreshToken', refreshToken);

        return { token, refreshToken };
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}
