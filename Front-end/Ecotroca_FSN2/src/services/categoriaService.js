export const getCategorias = () => Promise.resolve([
  {id:1, nome:'Eletrônicos'},
  {id:2, nome:'Esportes'},
  {id:3, nome:'Livros'},
  {id:4, nome:'Móveis'},
  {id:5, nome:'Instrumentos Musicais'},
  {id:6, nome:'Roupas'}
]);

export const getCategoriaById = (id) => Promise.resolve({id, nome:'Mock Categoria'});

export const createCategoria = () => Promise.resolve({success:true});

export const updateCategoria = () => Promise.resolve({success:true});

export const deleteCategoria = () => Promise.resolve({success:true});
