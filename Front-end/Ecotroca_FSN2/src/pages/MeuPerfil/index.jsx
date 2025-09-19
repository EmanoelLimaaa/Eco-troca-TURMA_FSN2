import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import { getItems } from "../../services/itemService";
import styles from "./MeuPerfil.module.css";

function MeuPerfil() {
  const [abaAtiva, setAbaAtiva] = useState("itens");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserItems = async () => {
        setLoading(true);
        try {
          const items = await getItems({ usuarioId: user.id });
          setItens(items);
        } catch (error) {
          console.error('Erro ao buscar itens do usuário:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserItems();
    }
  }, [user]);



  const handleEditarPerfil = () => {
    navigate("/editar-perfil");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          {user && user.imagem_perfil ? (
            <img src={`${import.meta.env.VITE_API_URL}${user.imagem_perfil}`} alt="Foto do perfil" className={styles.profilePic} />
          ) : (
            <div className={styles.profilePic}></div>
          )}
          <h1 className={styles.titulo}>{user ? user.nome : 'Meu Perfil'}</h1>
        </div>
      </header>

      <nav className={styles.abas}>
        <button
          className={abaAtiva === "itens" ? styles.abaAtiva : ""}
          onClick={() => setAbaAtiva("itens")}
        >
          Meus itens
        </button>
        <button
          className={abaAtiva === "recebidas" ? styles.abaAtiva : ""}
          onClick={() => setAbaAtiva("recebidas")}
        >
          Ofertas Recebidas
        </button>
        <button
          className={abaAtiva === "enviadas" ? styles.abaAtiva : ""}
          onClick={() => setAbaAtiva("enviadas")}
        >
          Ofertas enviadas
        </button>
      </nav>

      <div className={styles.listaItens}>
        {abaAtiva === "itens" && loading && <p>Carregando itens...</p>}
        {abaAtiva === "itens" && !loading && itens.length === 0 && <p>Você ainda não publicou nenhum item.</p>}
        {abaAtiva === "itens" && !loading &&
          itens.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <img src={item.imagem ? `http://localhost:3000/uploads/${item.imagem}` : null} alt={item.titulo} />
                <div className={styles.itemTexto}>
                  <strong>{item.titulo}</strong>
                  <span>{item.descricao}</span>
                </div>
              </div>
              <div className={styles.acoes}>
                <button className={styles.btnEditar}>Editar</button>
                <button className={styles.btnTrocar}>Trocar</button>
                <button className={styles.btnExcluir}>Excluir</button>
              </div>
            </div>
          ))}

        {abaAtiva === "recebidas" && <p>Exibir propostas recebidas...</p>}
        {abaAtiva === "enviadas" && <p>Exibir ofertas enviadas...</p>}
      </div>
    </div>
  );
}

export default MeuPerfil;
