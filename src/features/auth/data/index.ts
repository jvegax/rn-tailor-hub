/* eslint-disable @typescript-eslint/no-shadow */
import { storage } from '@/core/cache';
import { User } from '../models';
import { API_URL } from '@/core/api';

type LoginResponse = { token: string; refreshToken: string, userData: User } | null;
export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
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
            return null;
        }

        const body = await response.json();
        const userData: User = {
            id: body._id,
            email: body.email,
            name: body.name,
        };
        storage.set('userData', JSON.stringify(userData));
        storage.set('authToken', token);
        storage.set('refreshToken', refreshToken);

        return { token, refreshToken, userData };
    } catch (error) {
        return null;
    }
}

export async function register(email: string, password: string, name: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
            return null;
        }
        const loginResponse = await login(email, password);
        if (!loginResponse) {
            return null;
        }
        const { token, refreshToken, userData } = loginResponse;
        return { token, refreshToken, userData };
    } catch (error) {
        return null;
    }
}

export async function refreshToken(): Promise<string | null> {
    try {
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
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
        return null;
    }
}

export async function logout(): Promise<void> {
    try {
        const token = storage.getString('authToken') ?? '';
        const refreshTokenValue = storage.getString('refreshToken') ?? '';
        await fetch(`${API_URL}/auth/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
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


type AuthFetchProps = {
    url: string;
    options?: RequestInit;
    logoutHandler: () => void;
};

export async function authFetch({
    url,
    options = {},
    logoutHandler,
}: AuthFetchProps): Promise<Response> {
    const token = storage.getString('authToken');
    const headers = options.headers ? new Headers(options.headers) : new Headers();
    if (token) {
        headers.set('Authorization', `${token}`);
    }
    options.headers = headers;

    let response = await fetch(url, options);

    if (response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
            headers.set('Authorization', `${newToken}`);
            options.headers = headers;
            response = await fetch(url, options);
        } else {
            logoutHandler();
            throw new Error('Token expirado. Usuario desconectado.');
        }
    }

    const newTokenFromResponse = response.headers.get('authorization');
    if (newTokenFromResponse && newTokenFromResponse !== token) {
        storage.set('authToken', newTokenFromResponse);
    }

    return response;
}
