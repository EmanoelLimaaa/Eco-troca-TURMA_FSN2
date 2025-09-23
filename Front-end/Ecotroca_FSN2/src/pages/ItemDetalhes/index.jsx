import React, { useState, useEffect, useContext } from "react";
import styles from "./ItemDetalhes.module.css";
import { useParams, useNavigate } from "react-router-dom";
import EcoTrocaMenu from "../../components/EcoTrocaMenu";
import Footer from '../../components/Footer';
import { getItemById } from '../../services/itemService';
import { AuthContext } from '../../components/AuthContext';

const DetalhesItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError('');
      try {
        const item = await getItemById(id);
        setProduto(item);
      } catch (err) {
        console.error('Erro ao buscar item:', err);
        setError('Item não encontrado.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return <div className={styles.page}><p>Carregando...</p></div>;
  }

  if (error || !produto) {
    return <div className={styles.notFound}>{error || 'Produto não encontrado.'}</div>;
  }

  return (
    <div className={styles.page}>
      {/* MENU DO TOPO */}
      <EcoTrocaMenu variant="detalhesProduto" />

      <main className={styles.main}>
        <img src={produto.imagem ? `http://localhost:3000/uploads/${produto.imagem}` : null} alt={produto.titulo} className={styles.productImage} />
        <h1 className={styles.productTitle}>{produto.titulo}</h1>
        <div className={styles.productMeta}>
          <span className={styles.productCategory}>{produto.categoria?.nome}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.productLocation}>{produto.usuario?.cidade}</span>
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
        {!isLoggedIn && (
          <p
            className={styles.loginMsg}
            style={{ cursor: 'pointer', textDecoration: 'underline', color: '#59ce3b' }}
            onClick={() => navigate('/login')}
          >
            Faça login para propor uma troca
          </p>
        )}
      </main>
      <Footer />
    </div>

  );
};

export default DetalhesItem;
