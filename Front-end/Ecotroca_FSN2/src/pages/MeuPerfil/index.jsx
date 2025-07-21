import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MeuPerfil.module.css";

function MeuPerfil() {
  const [abaAtiva, setAbaAtiva] = useState("itens");
  const navigate = useNavigate();

  const itens = [
    {
      nome: "Livros",
      descricao: "Livros usados",
      imagem: "",
    },
    {
      nome: "Roupas",
      descricao: "Roupas usadas",
      imagem: "",
    },
    {
      nome: "Eletrônicos",
      descricao: "Eletrônicos usados",
      imagem: "",
    },
    {
      nome: "Móveis",
      descricao: "Móveis usados",
      imagem: "",
    },
  ];

  const handleEditarPerfil = () => {
    navigate("/editar-perfil");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Meu Perfil</h1>
        
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
        {abaAtiva === "itens" &&
          itens.map((item, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.itemInfo}>
                <img src={item.imagem} alt={item.nome} />
                <div className={styles.itemTexto}>
                  <strong>{item.nome}</strong>
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
