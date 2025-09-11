import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Configuracoes.module.css';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';
import { FiLogOut } from 'react-icons/fi';
import Footer from '../../components/Footer';
import { AuthContext } from '../../components/AuthContext';

function Configuracoes() {
  const [idioma, setIdioma] = useState("Português");
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [notifItens, setNotifItens] = useState(false);
  const [notifMensagens, setNotifMensagens] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (temaEscuro) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [temaEscuro]);

  const alternarTema = () => {
    setTemaEscuro((temaAtual) => !temaAtual);
  };

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <>
      <EcoTrocaMenu variant="configuracoes" />
      <div className={style.pagina}>
        <div className={style.container} style={{ paddingTop: '65px' }}>
          <h1 className={style.titulo}>Configurações</h1>

          <div className={style.grid}>

            <main className={style.colunaEsquerda}>

            {/* Geral */}
            <section className={style.secao}>
              <h2 className={style.secaoTitulo}>Geral</h2>

              <div className={style.item} onClick={() => setIdioma(idioma === "Português" ? "Inglês" : "Português")}>

                <div>
                  <strong>Idioma</strong>
                  <p>Altere o idioma do aplicativo</p>
                </div>
                <div className={style.valorItem}>

                  <span>{idioma}</span>
                  <span className={style.seta}>&gt;</span>
                </div>
              </div>

                <div className={style.item} onClick={alternarTema}>
  
                  <div>
                    <strong>Tema</strong>
                    <p>Altere o tema do aplicativo</p>
                  </div>
                  <div className={style.valorItem}>
  
                        <span>{temaEscuro ? "Escuro" : "Claro"}</span>
                      </div>
                    </div>
              </section>



            {/* Notificações */}
            <section className={style.secao}>
              <h2 className={style.secaoTitulo}>Notificações</h2>


              <div className={style.item}>
                <div>
                  <strong>Novos itens</strong>
                  <p>Receba notificações sobre novos itens</p>
                </div>
                <label className={style.toggleSwitch}>

                  <input
                    type="checkbox"
                    checked={notifItens}
                    onChange={() => setNotifItens(!notifItens)}
                  />
                  <span className={style.slider}></span>
                </label>
              </div>


              <div className={style.item}>
                <div>
                  <strong>Mensagens</strong>
                  <p>Receba notificações sobre mensagens</p>
                </div>
                <label className={style.toggleSwitch}>

                  <input
                    type="checkbox"
                    checked={notifMensagens}
                    onChange={() => setNotifMensagens(!notifMensagens)}
                  />

                  <span className={style.slider}></span>
                </label>
              </div>
            </section>


            {/* Privacidade */}
            <section className={style.secao}>
              <h2 className={style.secaoTitulo}>Privacidade</h2>


              <div className={style.item}>
                <div>
                  <strong>Informações pessoais</strong>
                  <p>Gerencie suas informações pessoais</p>
                </div>
                <span className={style.seta}>&gt;</span>
              </div>



              <div className={style.item}>
                <div>
                  <strong>Preferências de privacidade</strong>
                  <p>Gerencie suas preferências de privacidade</p>
                </div>
                <span className={style.seta}>&gt;</span>
              </div>
            </section>

            {/* Sobre */}
            <section className={style.secao}>
              <h2 className={style.secaoTitulo}>Sobre</h2>


              <div className={style.item}>
                <div>
                  <strong>Sobre o app</strong>
                  <p>Saiba mais sobre o aplicativo</p>
                </div>
                <span className={style.seta}>&gt;</span>
              </div>

              <button className={style.botaoSair} onClick={handleLogout}>
                <FiLogOut size={18} /> Sair
              </button>
            </section>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Configuracoes;