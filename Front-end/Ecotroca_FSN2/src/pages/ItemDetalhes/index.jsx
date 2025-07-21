import React from "react";
import styles from "./ItemDetalhes.module.css";
import { useParams, useNavigate } from "react-router-dom";
import EcoTrocaMenu from "../../components/EcoTrocaMenu";
import Footer from '../../components/Footer';


import bicicletaImg from '../../assets/imagensdaHome/bicicletademontanha.jpg';
import livroImg from '../../assets/imagensdaHome/Livro-Senhordosaneis.jpg';
import cameraImg from '../../assets/imagensdaHome/cameraDSLR.jpg';
import mesaImg from '../../assets/imagensdaHome/mesadejantar.jpg';
import sofaImg from '../../assets/imagensdaHome/sofa2lugares.jpg';
import guitarraImg from '../../assets/imagensdaHome/guitarra-eletrica.jpg';

const produtos = [
  {
    id: 1,
    nome: "Bicicleta de montanha",
    categoria: "Esportes",
    cidade: "São Paulo",
    descricao: "Bicicleta de montanha em excelente estado, usada poucas vezes.",
    imagem: bicicletaImg
  },
  {
    id: 2,
    nome: "Livro O Senhor dos Anéis",
    categoria: "Livros",
    cidade: "Rio de Janeiro",
    descricao: "Coleção completa do Senhor dos Anéis em ótimo estado.",
    imagem: livroImg
  },
  {
    id: 3,
    nome: "Câmera DSLR",
    categoria: "Eletrônicos",
    cidade: "Belo Horizonte",
    descricao: "Câmera DSLR Canon, lente 18-55mm, funciona perfeitamente.",
    imagem: cameraImg
  },
  {
    id: 4,
    nome: "Mesa de jantar",
    categoria: "Móveis",
    cidade: "Curitiba",
    descricao: "Mesa de jantar de madeira para 6 pessoas.",
    imagem: mesaImg
  },
  {
    id: 5,
    nome: "Sofá de dois lugares",
    categoria: "Móveis",
    cidade: "Porto Alegre",
    descricao: "Sofá confortável, tecido bege, pouco uso.",
    imagem: sofaImg
  },
  {
    id: 6,
    nome: "Guitarra elétrica",
    categoria: "Instrumentos Musicais",
    cidade: "Salvador",
    descricao: "Guitarra elétrica em ótimo estado, acompanha case.",
    imagem: guitarraImg
  },
];

const DetalhesItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const produto = produtos.find(p => String(p.id) === id);

  if (!produto) {
    return <div className={styles.notFound}>Produto não encontrado.</div>;
  }

  return (
    <div className={styles.page}>
      {/* MENU DO TOPO */}
      <EcoTrocaMenu variant="detalhesProduto" />

      <main className={styles.main}>
        <img src={produto.imagem} alt={produto.nome} className={styles.productImage} />
        <h1 className={styles.productTitle}>{produto.nome}</h1>
        <div className={styles.productMeta}>
          <span className={styles.productCategory}>{produto.categoria}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.productLocation}>{produto.cidade}</span>
        </div>
        <p className={styles.productDescription}>{produto.descricao}</p>
        <div className={styles.actions}>
          <button
            className={styles.btnProposta}
            onClick={() => navigate(`/propostas/${produto.id}`)}
          >
            Faça uma proposta
          </button>
        </div>
        <p
          className={styles.loginMsg}
          style={{ cursor: 'pointer', textDecoration: 'underline', color: '#59ce3b' }}
          onClick={() => navigate('/login')}
        >
          Faça login para propor uma troca
        </p>
      </main>
    </div>
  );
};

export default DetalhesItem;
