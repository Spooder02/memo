// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import apiClient from '../api/client';
import { UserProfileInfo } from '../types/AuthData';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode 필요

interface AuthContextType {
    user: UserProfileInfo | null;
    token: string | null;
    login: (id: string, pw: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfileInfo | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('jwt_token'));

    useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                try {
                    const response = await apiClient.get('/profile');
                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                    logout(); // 토큰이 유효하지 않으면 로그아웃
                }
            }
        };
        fetchProfile();
    }, [token]);

    const login = async (id: string, pw: string) => {
        const response = await apiClient.post('/login', { id, password: pw });
        const { token } = response.data;
        localStorage.setItem('jwt_token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
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