import React, { createContext, useState, useEffect } from 'react';
import { login, register, getUserProfile } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile();
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogin = async (formData) => {
        try {
            const response = await login(formData);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const handleRegister = async (formData) => {
        try {
            const response = await register(formData);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};
