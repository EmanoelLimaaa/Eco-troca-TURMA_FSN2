import React, { useState } from 'react';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';
import style from './DetalhesConfiguracao.module.css';

function DetalhesConfiguracao() {
  const [permitirCompartilhamento, setPermitirCompartilhamento] = useState(false);
  const [visibilidadePerfil, setVisibilidadePerfil] = useState('privado');
  const [notificacoes, setNotificacoes] = useState({
    propostas: true,
    promocoes: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Alterações salvas!');
  };

  return (
    <div className={style.page}>
      <EcoTrocaMenu variant="configuracoes" />

      <div className={style.container}>
        <h2 className={style.titulo}>Detalhes de Configurações</h2>
        <p className={style.descricao}>Gerencie suas preferências e configurações da conta</p>

        <form onSubmit={handleSubmit}>
          {/* PRIVACIDADE */}
          <section className={style.card}>
            <h3>🛡️ Preferências de Privacidade</h3>
            <p>Configure como seus dados são utilizados</p>

            <label className={style.checkbox}>
              <input
                type="checkbox"
                checked={permitirCompartilhamento}
                onChange={() => setPermitirCompartilhamento(!permitirCompartilhamento)}
              />
              Permitir compartilhamento de histórico de trocas
            </label>

            <div className={style.radioGroup}>
              <p><strong>Visibilidade do Perfil</strong></p>
              <label>
                <input
                  type="radio"
                  name="visibilidade"
                  value="publico"
                  checked={visibilidadePerfil === 'publico'}
                  onChange={() => setVisibilidadePerfil('publico')}
                />
                Público
              </label>
              <label>
                <input
                  type="radio"
                  name="visibilidade"
                  value="privado"
                  checked={visibilidadePerfil === 'privado'}
                  onChange={() => setVisibilidadePerfil('privado')}
                />
                Privado
              </label>
            </div>
          </section>

          {/* NOTIFICAÇÕES */}
          <section className={style.card}>
            <h3>🔔 Notificações por Email</h3>
            <p>Escolha os tipos de notificações que você deseja receber</p>

            <label className={style.checkbox}>
              <input
                type="checkbox"
                checked={notificacoes.propostas}
                onChange={() =>
                  setNotificacoes({ ...notificacoes, propostas: !notificacoes.propostas })
                }
              />
              Novas propostas de troca
            </label>

            <label className={style.checkbox}>
              <input
                type="checkbox"
                checked={notificacoes.promocoes}
                onChange={() =>
                  setNotificacoes({ ...notificacoes, promocoes: !notificacoes.promocoes })
                }
              />
              Emails promocionais
            </label>
          </section>

          {/* SOBRE */}
          <section className={style.card}>
            <h3>ℹ️ Saiba mais sobre o nosso site</h3>
            <p>Informações sobre a EcoTroca e nossa missão</p>

            <div className={style.infoCard}>
              <strong>Nossa Missão</strong>
              <p>
                A EcoTroca foi criada com o objetivo de promover a economia circular e reduzir o desperdício por meio de trocas sustentáveis entre usuários.
              </p>
              <a href="#">Ler mais →</a>
            </div>

            <div className={style.infoCard}>
              <strong>Como Funciona</strong>
              <p>
                Conectamos pessoas que desejam trocar itens, criando uma rede sustentável onde produtos ganham nova vida ao invés de serem descartados.
              </p>
              <a href="#">Ver tutorial →</a>
            </div>

            <div className={style.stats}>
              <div>
                <strong>2.847</strong>
                <span>Itens trocados</span>
              </div>
              <div>
                <strong>1.234</strong>
                <span>Usuários ativos</span>
              </div>
            </div>

            <div className={style.buttons}>
              <p>Suporte e Comunidade</p>
              <button type="button">💬 Chat</button>
              <button type="button">📧 Email</button>
            </div>
          </section>

          <div className={style.footerButtons}>
            <button type="button">Cancelar</button>
            <button type="submit" className={style.save}>Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DetalhesConfiguracao;
