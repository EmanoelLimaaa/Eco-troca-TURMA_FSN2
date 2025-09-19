import style from './PublicarItem.module.css';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';
import { useState, useEffect, useContext } from 'react';
import { createItem, uploadItemImage } from '../../services/itemService';
import { getCategorias } from '../../services/categoriaService';
import { AuthContext } from '../../components/AuthContext';

function PublicarItem() {
  const [mensagem, setMensagem] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    imagem: null,
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') {
      setFormData({ ...formData, imagem: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMensagem('Você precisa estar logado para publicar um item.');
      return;
    }
    if (!formData.titulo || !formData.descricao || !formData.categoria) {
      setMensagem('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const itemData = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoriaId: categorias.find(cat => cat.nome === formData.categoria)?.id,
        usuarioId: user.id,
        estado_item: 'novo', // ou outro valor padrão
      };

      const createdItem = await createItem(itemData);

      if (formData.imagem) {
        await uploadItemImage(createdItem.id, formData.imagem);
      }

      setMensagem('Item publicado com sucesso!');
      setFormData({
        titulo: '',
        descricao: '',
        categoria: '',
        imagem: null,
      });
    } catch (error) {
      console.error('Erro ao publicar item:', error);
      setMensagem('Erro ao publicar item.');
    }
  };

  return (
    <div className={style.page}>
      <EcoTrocaMenu variant="publicarItem" />

      <div className={style.container}>
        <h1>Publicar um Item</h1>

        <form className="form" onSubmit={handleSubmit}>
          {/* Upload de imagem */}
          <div className={style.upload}>
            <label htmlFor="imagem">Adicionar Imagem</label>
            <input
              id="imagem"
              type="file"
              accept="image/*"
              name="imagem"
              className={style.hiddenInput}
              onChange={handleChange}
            />
          </div>
          {/* Nome do item */}
          <div className={style.campo}>
            <label htmlFor="titulo">Nome do Item</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Ex: Camisa Preta"
              className={style.inputTexto}
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>
          {/* Descrição */}

          <div className={style.campo}>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              placeholder="Descreva o item..."
              className={style.inputTexto}
              value={formData.descricao}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Categoria, localização e botão de publicar */}
          <div className={style.campo}>
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              name="categoria"
              className={style.inputTexto}
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nome}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          {mensagem && <p className={style.mensagem}>{mensagem}</p>}
          <button type="submit" className={style.botao}>
            Publicar Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default PublicarItem;
