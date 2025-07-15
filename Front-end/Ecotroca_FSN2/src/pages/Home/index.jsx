import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';

import bicicletaImg from '../../assets/imagensdaHome/bicicletademontanha.jpg';
import livroImg from '../../assets/imagensdaHome/Livro-Senhordosaneis.jpg';
import cameraImg from '../../assets/imagensdaHome/cameraDSLR.jpg';
import mesaImg from '../../assets/imagensdaHome/mesadejantar.jpg';
import sofaImg from '../../assets/imagensdaHome/sofa2lugares.jpg';
import guitarraImg from '../../assets/imagensdaHome/guitarra-eletrica.jpg';

import styles from './Home.module.css';

const produtosOriginais = [
  { id: 1, nome: "Bicicleta de montanha", categoria: "Esportes", cidade: "São Paulo", imagem: bicicletaImg },
  { id: 2, nome: "Livro O Senhor dos Anéis", categoria: "Livros", cidade: "Rio de Janeiro", imagem: livroImg },
  { id: 3, nome: "Câmera DSLR", categoria: "Eletrônicos", cidade: "Belo Horizonte", imagem: cameraImg },
  { id: 4, nome: "Mesa de jantar", categoria: "Móveis", cidade: "Curitiba", imagem: mesaImg },
  { id: 5, nome: "Sofá de dois lugares", categoria: "Móveis", cidade: "Porto Alegre", imagem: sofaImg },
  { id: 6, nome: "Guitarra elétrica", categoria: "Instrumentos Musicais", cidade: "Salvador", imagem: guitarraImg },
];

const categorias = [
  "Categoria",
  "Eletrônicos",
  "Esportes",
  "Livros",
  "Móveis",
  "Instrumentos Musicais",
  "Roupas"
];

const cidades = [
  "Cidade/Bairro",
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Salvador",
  "Aldeota; Fortaleza"
];

const Home = () => {
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtosOriginais);
  const [filtroCategoria, setFiltroCategoria] = useState('Categoria');
  const [filtroCidade, setFiltroCidade] = useState('Cidade/Bairro');
  const [busca, setBusca] = useState('');

  const navigate = useNavigate();

  const filtrarProdutos = useCallback(() => {
    let temp = produtosOriginais;

    if (filtroCategoria !== 'Categoria') {
      temp = temp.filter(p => p.categoria === filtroCategoria);
    }
    if (filtroCidade !== 'Cidade/Bairro') {
      temp = temp.filter(p => p.cidade === filtroCidade);
    }
    if (busca.trim() !== '') {
      const termoBusca = busca.toLowerCase();
      temp = temp.filter(p =>
        p.nome.toLowerCase().includes(termoBusca)
      );
    }
    setProdutosFiltrados(temp);
  }, [filtroCategoria, filtroCidade, busca]);

  useEffect(() => {
    filtrarProdutos();
  }, [filtrarProdutos]);

  return (
    <div className={styles.page}>
      {/* Menu */}
      <EcoTrocaMenu variant="home" />

      <div className={styles.filtersContainer}>
        <div className={styles.filtersRow}>
          <select
            className={styles['filter-select']}
            value={filtroCategoria}
            onChange={e => setFiltroCategoria(e.target.value)}
          >
            {categorias.map(c => <option key={c}>{c}</option>)}
          </select>
          
          <select
            className={`${styles['filter-select']} ${styles['filter-cidade']}`}
            value={filtroCidade}
            onChange={e => setFiltroCidade(e.target.value)}
          >
            {cidades.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <input
          className={styles['search-input']}
          type="text"
          placeholder="Buscar por palavra-chave"
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <div className={styles.productsGrid}>
        {produtosFiltrados.length === 0 && (
          <p className={styles['nenhum-produto']}>Nenhum produto encontrado.</p>
        )}

        {produtosFiltrados.map(p => (
          <div className={styles['product-card']} key={p.id}>
            <img src={p.imagem} alt={p.nome} className={styles['product-image']} />
            <div className={styles['product-title']}>{p.nome}</div>
            <div className={styles['product-category']}>{p.categoria}</div>
            <div className={styles['product-location']}>{p.cidade}</div>
            <button
              className={styles['product-btn']}
              onClick={() => navigate(`/detalhes/${p.id}`)}
            >
              Ver detalhes
            </button>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>©2025 EcoTroca. Todos os direitos reservados.</footer>
    </div>
  );
};

export default Home;
