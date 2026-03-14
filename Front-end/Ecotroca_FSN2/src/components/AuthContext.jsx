import React, { createContext, useState, useCallback, useEffect } from 'react';
import { login as loginService, logout as logoutService, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser().then(currentUser => {
        setUser(currentUser);
      }).catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  }, [redirectTo]);

  const login = useCallback(async (email, senha) => {
    try {
      setLoading(true);
      const result = await loginService(email, senha);
      localStorage.setItem('token', result.token || 'mock');
      localStorage.setItem('refreshToken', result.refreshToken || 'mock');
      setUser(result.user);
      setRedirectTo('/');
      return result.user;
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutService();
    } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setRedirectTo('/login');
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn: !!user,
      user,
      loading,
      login,
      logout,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
