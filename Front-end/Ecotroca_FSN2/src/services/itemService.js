import api from './api';

export const getItems = async (filtros = {}) => {
  const mockItems = [
    { id:1, titulo:'Bicicleta Montanha', descricao:'Excelente estado', imagem:'bicicletademontanha.jpg', categoria:{nome:'Esportes'}, usuario:{cidade:'São Paulo', nome:'João'}, estado_item:'ótimo', disponivel:true },
    { id:2, titulo:'Guitarra Elétrica', descricao:'Fender Stratocaster 2020', imagem:'guitarra-eletrica.jpg', categoria:{nome:'Instrumentos Musicais'}, usuario:{cidade:'Rio de Janeiro', nome:'Maria'}, estado_item:'excelente', disponivel:true },
    { id:3, titulo:'Câmera DSLR', descricao:'Canon EOS 90D + lente 18-55', imagem:'cameraDSLR.jpg', categoria:{nome:'Eletrônicos'}, usuario:{cidade:'Belo Horizonte', nome:'Pedro'}, estado_item:'bom', disponivel:true },
    { id:4, titulo:'Livro Senhor dos Anéis', descricao:'Coleção completa 3 livros', imagem:'Livro-Senhordosaneis.jpg', categoria:{nome:'Livros'}, usuario:{cidade:'Curitiba', nome:'Ana'}, estado_item:'novo', disponivel:true },
    { id:5, titulo:'Sofá 2 Lugares', descricao:'Couro bege confortável', imagem:'sofa2lugares.jpg', categoria:{nome:'Móveis'}, usuario:{cidade:'Porto Alegre', nome:'Carlos'}, estado_item:'ótimo', disponivel:true },
    { id:6, titulo:'Mesa de Jantar', descricao:'Madeira maciça 6 cadeiras', imagem:'mesadejantar.jpg', categoria:{nome:'Móveis'}, usuario:{cidade:'Salvador', nome:'Lúcia'}, estado_item:'bom', disponivel:true },
  ];

  let filtered = mockItems;
  if (filtros.categoria) filtered = filtered.filter(i => i.categoria.nome === filtros.categoria);
  if (filtros.usuarioId) filtered = filtered.filter(i => i.usuario.id === filtros.usuarioId);
  if (filtros.cidade) filtered = filtered.filter(i => i.usuario.cidade.includes(filtros.cidade));
  return new Promise(resolve => setTimeout(() => resolve(filtered), 500));

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
