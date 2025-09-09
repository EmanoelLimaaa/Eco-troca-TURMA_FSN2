import api from './api';

export const getCategorias = () => api.get('/categorias').then(res => res.data);

export const getCategoriaById = (id) => api.get(`/categorias/${id}`).then(res => res.data);

export const createCategoria = (categoriaData) => 
  api.post('/categorias', categoriaData).then(res => res.data);

export const updateCategoria = (id, categoriaData) => 
  api.put(`/categorias/${id}`, categoriaData).then(res => res.data);

export const deleteCategoria = (id) => api.delete(`/categorias/${id}`);
