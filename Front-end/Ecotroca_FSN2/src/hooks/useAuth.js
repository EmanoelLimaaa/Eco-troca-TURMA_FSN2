import { useState, useEffect, useCallback } from 'react';
import { login as loginService, register as registerService, logout as logoutService, getCurrentUser } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verifica se o usuário está autenticado ao carregar o hook
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função de login
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const { token, refreshToken, user: userData } = await loginService(email, password);
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message || 'Erro ao fazer login');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Função de registro
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await registerService(userData);
      return result;
    } catch (error) {
      setError(error.message || 'Erro ao registrar');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Função de logout
  const logout = useCallback(async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    setUser,
  };
};

export default useAuth;
