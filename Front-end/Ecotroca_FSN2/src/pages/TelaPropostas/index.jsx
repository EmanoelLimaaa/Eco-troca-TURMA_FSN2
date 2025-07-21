import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './TelaPropostas.module.css';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';

import bicicletaImg from '../../assets/imagensdaHome/bicicletademontanha.jpg';
import livroImg from '../../assets/imagensdaHome/Livro-Senhordosaneis.jpg';
import cameraImg from '../../assets/imagensdaHome/cameraDSLR.jpg';
import mesaImg from '../../assets/imagensdaHome/mesadejantar.jpg';
import sofaImg from '../../assets/imagensdaHome/sofa2lugares.jpg';
import guitarraImg from '../../assets/imagensdaHome/guitarra-eletrica.jpg';

// Produtos cadastraos
const produtos = [
  { id: 1, nome: "Bicicleta de montanha", imagem: bicicletaImg },
  { id: 2, nome: "Livro O Senhor dos Anéis", imagem: livroImg },
  { id: 3, nome: "Câmera DSLR", imagem: cameraImg },
  { id: 4, nome: "Mesa de jantar", imagem: mesaImg },
  { id: 5, nome: "Sofá de dois lugares", imagem: sofaImg },
  { id: 6, nome: "Guitarra elétrica", imagem: guitarraImg },
];

// Dados fictícios de ofertas temporário de quem está fazendo a proposta
// Quando a gente fizer o backend vamos ter que fazer açterações pra pegar do banco
const ofertas = [
  { idProduto: 1, nomeOfertante: 'Fernanda Silva', telefone: '+55 85 99287-3743' },
  { idProduto: 2, nomeOfertante: 'João Pedro', telefone: '+55 85 97463-5323' },
  { idProduto: 3, nomeOfertante: 'Maria Souza', telefone: '+55 85 97777-7777' },
  { idProduto: 4, nomeOfertante: 'Carlos Lima', telefone: '+55 85 96666-6666' },
  { idProduto: 5, nomeOfertante: 'Ana Paula', telefone: '+55 85 95555-5555' },
  { idProduto: 6, nomeOfertante: 'Rafael Santos', telefone: '+55 85 94444-4444' },
];

// Ícone do celular
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.phoneIcon}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

function AceitarOferta() {
  const { id } = useParams();
  const produto = produtos.find(p => p.id === Number(id));
  const oferta = ofertas.find(o => o.idProduto === Number(id));

  if (!produto) {
    return (
      <>
        <EcoTrocaMenu variant="ofertaItem" />
        <div className={styles.pageWrapper}>
          <p>Produto não encontrado.</p>
        </div>
      </>
    );
  }

  const nomeOfertante = oferta ? oferta.nomeOfertante : 'Desconhecido';
  const telefone = oferta ? oferta.telefone : 'Telefone não disponível';

  return (
    <>
      <EcoTrocaMenu variant="ofertaItem" />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Oferta por seu item</h1>

          <div className={styles.offerHeader}>
            <div className={styles.offerInfo}>
              <p className={styles.offerLabel}>Oferta recebida</p>
              <h2 className={styles.itemName}>{produto.nome}</h2>
              <p className={styles.offerSender}>Oferta enviada por: {nomeOfertante}</p>
            </div>
            <div className={styles.imageContainer}>
              <img src={produto.imagem} alt={produto.nome} className={styles.itemImage} />
            </div>
          </div>

          <div className={styles.offerDetails}>
            <h3 className={styles.detailsTitle}>Detalhes da oferta</h3>
            <p className={styles.detailsText}>
              {nomeOfertante} se ofereceu para trocar um item pela sua {produto.nome.toLowerCase()}. Você pode entrar em contato diretamente com ele para combinar a troca.
            </p>
            <div className={styles.contactSection}>
              <div className={styles.contactInfo}>
                <PhoneIcon />
                <div>
                  <p className={styles.contactLabel}>Número de contato</p>
                  <p className={styles.contactSublabel}>Contactar diretamente com {nomeOfertante}</p>
                </div>
              </div>
              <p className={styles.phoneNumber}>{telefone}</p>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.acceptButton}>Aceitar oferta</button>
            <button className={styles.rejectButton}>Recusar oferta</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AceitarOferta;
