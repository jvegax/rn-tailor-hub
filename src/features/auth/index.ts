import { storage } from '@/core/cache';

const API_BASE_URL = 'https://technical-review-api-tailor.netlify.app/api';

type LoginResponse = { token: string; refreshToken: string } | null;
export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
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
            console.error('Faltan token o refreshToken en la respuesta');
            return null;
        }

        storage.set('authToken', token);
        storage.set('refreshToken', refreshToken);

        return { token, refreshToken };
    } catch (error) {
        console.error('Error en login:', error);
        return null;
    }
}

export async function refreshToken(): Promise<string | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.status === 202) {
            const newToken = response.headers.get('authorization');
            const setCookie = response.headers.get('set-cookie');
            if (setCookie) {
                const match = setCookie.match(/refreshToken=([^;]+)/);
                if (match) {
                    storage.set('refreshToken', match[1]);
                }
            }
            if (newToken) {
                storage.set('authToken', newToken);
                return newToken;
            }
        }
        return null;
    } catch (error) {
        console.error('Error en refreshToken:', error);
        return null;
    }
}

export async function logout(): Promise<void> {
    try {
        const token = storage.getString('authToken') ?? '';
        const refreshTokenValue = storage.getString('refreshToken') ?? '';
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': `refreshToken=${refreshTokenValue}`,
            },
            credentials: 'include',
        });
    } catch (error) {
        console.error('Error en logout:', error);
    } finally {
        storage.delete('authToken');
        storage.delete('refreshToken');
    }
}


export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = storage.getString('authToken');
    const headers = options.headers ? new Headers(options.headers) : new Headers();
    if (token) {
        headers.set('Authorization', token);
    }
    options.headers = headers;

    let response = await fetch(url, options);

    if (response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
            headers.set('Authorization', newToken);
            options.headers = headers;
            response = await fetch(url, options);
        } else {
            await logout();
            throw new Error('Token expirado. Usuario desconectado.');
        }
    }

    const newTokenFromResponse = response.headers.get('authorization');
    if (newTokenFromResponse && newTokenFromResponse !== token) {
        storage.set('authToken', newTokenFromResponse);
    }

    return response;
}
