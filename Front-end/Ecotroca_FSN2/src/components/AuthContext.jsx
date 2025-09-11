import React, { createContext, useState, useCallback, useEffect } from 'react';
import { login as loginService, logout as logoutService, getCurrentUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  }, [redirectTo]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const { token, refreshToken } = await loginService(email, password);
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      
      setRedirectTo('/');
      
      return currentUser;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setRedirectTo('/login');
    }
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