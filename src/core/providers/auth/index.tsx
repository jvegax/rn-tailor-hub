import { storage } from '@/core/cache';
import { login, logout } from '@/features/auth/data';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AuthData = {
    token: string;
    refreshToken: string;
};

type AuthContextType = {
    authData: AuthData | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);

    useEffect(() => {
        const token = storage.getString('authToken');
        const refreshTokenVal = storage.getString('refreshToken');
        if (token && refreshTokenVal) {
            setAuthData({ token, refreshToken: refreshTokenVal });
        }
    }, []);

    const loginHandler = async (email: string, password: string): Promise<boolean> => {
        const result = await login(email, password);
        if (result) {
            setAuthData(result);
            return true;
        }
        return false;
    };

    const logoutHandler = async () => {
        await logout();
        setAuthData(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login: loginHandler, logout: logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
