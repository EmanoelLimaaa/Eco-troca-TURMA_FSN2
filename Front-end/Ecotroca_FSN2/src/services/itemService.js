import api from './api';

export const getItems = async (filtros = {}) => {
  try {
    console.log('Buscando itens com filtros:', filtros);
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params.append(key, value);
    });
    
    const response = await api.get(`/itens?${params}`);
    console.log('Resposta da API:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    throw error;
  }
};

export const getItemById = (id) => api.get(`/itens/${id}`).then(res => res.data);

export const createItem = (itemData) => api.post('/itens', itemData).then(res => res.data);

export const updateItem = (id, itemData) => api.put(`/itens/${id}`, itemData).then(res => res.data);

export const deleteItem = (id) => api.delete(`/itens/${id}`);

export const uploadItemImage = (itemId, imageFile) => {
  const formData = new FormData();
  formData.append('imagem', imageFile);
  return api.post(`/itens/${itemId}/imagem`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};
