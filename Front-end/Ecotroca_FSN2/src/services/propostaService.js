import api from './api';

export const getPropostas = (filtros = {}) => {
  const params = new URLSearchParams(filtros);
  return api.get(`/propostas?${params}`).then(res => res.data);
};

export const getPropostaById = (id) => api.get(`/propostas/${id}`).then(res => res.data);

export const criarProposta = (propostaData) => api.post('/propostas', propostaData).then(res => res.data);

export const atualizarProposta = (id, propostaData) => 
  api.put(`/propostas/${id}`, propostaData).then(res => res.data);

export const responderProposta = (id, resposta) => 
  api.patch(`/propostas/${id}/responder`, { resposta }).then(res => res.data);

export const cancelarProposta = (id) => api.delete(`/propostas/${id}`);
