import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';
import Footer from '../../components/Footer';
import styles from './Home.module.css';
import { getItems } from '../../services/itemService';

const categorias = [
  'Categoria',
  'Eletrônicos',
  'Esportes',
  'Livros',
  'Móveis',
  'Instrumentos Musicais',
  'Roupas',
];

const cidades = [
  'Cidade/Bairro',
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Curitiba',
  'Porto Alegre',
  'Salvador',
  'Aldeota',
];

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Categoria');
  const [filtroCidade, setFiltroCidade] = useState('Cidade/Bairro');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const filtrarProdutos = useCallback(() => {
    let temp = produtos;

    if (filtroCategoria !== 'Categoria') {
      temp = temp.filter((p) => p.categoria?.nome === filtroCategoria);
    }
    if (filtroCidade !== 'Cidade/Bairro') {
      temp = temp.filter((p) => p.usuario?.cidade === filtroCidade);
    }
    if (busca.trim() !== '') {
      const termoBusca = busca.toLowerCase();
      temp = temp.filter((p) => p.titulo.toLowerCase().includes(termoBusca));
    }
    setProdutosFiltrados(temp);
  }, [filtroCategoria, filtroCidade, busca, produtos]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const items = await getItems();
        setProdutos(items);
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    filtrarProdutos();
  }, [filtrarProdutos]);

  return (
    <div className={styles.page}>
      <EcoTrocaMenu variant="home" />
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <p>Junte-se ao EcoTroca e promova um mundo mais sustentável.</p>
        </div>
      </div>
      <div className={styles.filtersContainer}>
        <div className={styles.filtersRow}>
          <select
            className={styles['filter-select']}
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className={`${styles['filter-select']} ${styles['filter-cidade']}`}
            value={filtroCidade}
            onChange={(e) => setFiltroCidade(e.target.value)}
          >
            {cidades.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <input
          className={styles['search-input']}
          type="text"
          placeholder="Buscar por palavra-chave"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <div className={styles.productsGrid}>
        {loading && <p>Carregando itens...</p>}
        {!loading && produtosFiltrados.length === 0 && (
          <p className={styles['nenhum-produto']}>Nenhum produto encontrado.</p>
        )}
        {!loading && produtosFiltrados.map((p) => (
          <div className={styles['product-card']} key={p.id}>
            <img src={p.imagem ? `/src/assets/imagensdaHome/${p.imagem}` : '/src/assets/ImagensdoMeuPerfil/user.png'} alt={p.titulo} className={styles['product-image']} />
            <div className={styles['product-title']}>{p.titulo}</div>
            <div className={styles['product-category']}>{p.categoria?.nome}</div>
            <div className={styles['product-location']}>{p.usuario?.cidade}</div>
            <button
              className={styles['product-btn']}
              onClick={() => navigate(`/detalhes/${p.id}`)}
            >
              Ver detalhes
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
