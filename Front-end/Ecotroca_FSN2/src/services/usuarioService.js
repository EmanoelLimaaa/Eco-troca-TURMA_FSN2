import api from './api';

export const getPerfil = () => api.get('/usuarios/me').then(res => res.data);

export const atualizarPerfil = (dadosUsuario) => 
  api.put('/usuarios/me', dadosUsuario).then(res => res.data);

export const alterarSenha = (senhaAtual, novaSenha) => 
  api.put('/usuarios/alterar-senha', { senhaAtual, novaSenha });

export const getItensUsuario = (usuarioId) => 
  api.get(`/usuarios/${usuarioId}/itens`).then(res => res.data);

export const getPropostasRecebidas = () => 
  api.get('/usuarios/me/propostas/recebidas').then(res => res.data);

export const getPropostasEnviadas = () => 
  api.get('/usuarios/me/propostas/enviadas').then(res => res.data);

export const uploadFotoPerfil = (foto) => {
  const formData = new FormData();
  formData.append('foto', foto);
  return api.post('/usuarios/me/foto', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};
