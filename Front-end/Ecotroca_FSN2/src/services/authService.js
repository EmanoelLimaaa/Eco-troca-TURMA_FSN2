import api from './api';

export const login = (email, senha) => api.post('/auth/login', { email, senha }).then(res => res.data);

export const register = (userData) => api.post('/auth/register', userData).then(res => res.data);

export const getCurrentUser = () => api.get('/auth/me').then(res => res.data);

export const updateProfile = (userData) => api.put('/auth/me', userData).then(res => res.data);

export const logout = () => api.post('/auth/logout');
