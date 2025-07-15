import style from './PublicarItem.module.css';
import { useNavigate } from 'react-router-dom';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';

function PublicarItem() {
const navigate = useNavigate();

return (
    <div className={style.page}>
      <EcoTrocaMenu variant="publicarItem" />

      <div className={style.container}>
        <h1>Publicar um Item</h1>

        <form className="form">

          {/* Upload de imagem */}
          <div className={style.upload}>
            <label htmlFor="imagem">Adicionar Imagem</label>
            <input id="imagem" type="file" className={style.hiddenInput} />
          </div>

          {/* Nome do item */}
          <div className={style.campo}>
            <label htmlFor="nome">Nome do Item</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Ex: Camisa Preta"
              className={style.inputTexto}
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
            ></textarea>
          </div>

          {/* Categoria */}
          <div className={style.campo}>
            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" name="categoria" className={style.inputTexto}>
              <option value="">Selecione uma categoria</option>
              <option value="roupas">Roupas</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="moveis">Móveis</option>
              <option value="livros">Livros</option>
                <option value="esportes">Esportes</option>
                <option value="instrumentos">Instrumentos Musicais</option>
            </select>
          </div>

          {/* Cidade/Bairro */}
          <div className={style.campo}>
            <label htmlFor="localizacao">Cidade/Bairro</label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              placeholder="Fortaleza, Centro"
              className={style.inputTexto}
            />
          </div>

          {/* Botão */}
          <button type="submit" className={style.botao}>Publicar Item</button>
        </form>
      </div>
    </div>
  );
}

export default PublicarItem;
