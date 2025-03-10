import { storage } from '@/core/cache';
import { login } from '@/features/auth';
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
        const refreshToken = storage.getString('refreshToken');
        if (token && refreshToken) {
            setAuthData({ token, refreshToken });
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

    const logout = () => {
        setAuthData(null);
        storage.delete('authToken');
        storage.delete('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ authData, login: loginHandler, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
