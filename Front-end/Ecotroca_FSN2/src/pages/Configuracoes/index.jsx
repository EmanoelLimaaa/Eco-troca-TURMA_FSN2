import React from 'react';
import style from './Configuracoes.module.css';

function Configuracoes() {
  return (
    <div className={style.container}>
      <h1 className={style.titulo}>Configurações</h1>

      <div className={style.grid}>
        {/* Coluna da Esquerda com as Opções */}
        <main className={style.colunaEsquerda}>

          {/* Seção Geral */}
          <section className={style.secao}>
            <h2 className={style.secaoTitulo}>Geral</h2>
            <div className={style.item}>
              <div>
                <strong>Idioma</strong>
                <p>Altere o idioma do aplicativo</p>
              </div>
              <div className={style.valorItem}>
                <span>Português</span>
                <span className={style.seta}>&gt;</span>
              </div>
            </div>
            <div className={style.item}>
              <div>
                <strong>Tema</strong>
                <p>Altere o tema do aplicativo</p>
              </div>
              <div className={style.valorItem}>
                <span>Sistema</span>
                <span className={style.seta}>&gt;</span>
              </div>
            </div>
          </section>

          {/* Seção Notificações */}
          <section className={style.secao}>
            <h2 className={style.secaoTitulo}>Notificações</h2>
            <div className={style.item}>
              <div>
                <strong>Novos itens</strong>
                <p>Receba notificações sobre novos itens</p>
              </div>
              <label className={style.toggleSwitch}>
                <input type="checkbox" />
                <span className={style.slider}></span>
              </label>
            </div>
            <div className={style.item}>
              <div>
                <strong>Mensagens</strong>
                <p>Receba notificações sobre mensagens</p>
              </div>
              <label className={style.toggleSwitch}>
                <input type="checkbox" defaultChecked={true} />
                <span className={style.slider}></span>
              </label>
            </div>
          </section>

          {/* Seção Privacidade */}
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

          {/* Seção Sobre */}
          <section className={style.secao}>
            <h2 className={style.secaoTitulo}>Sobre</h2>
            <div className={style.item}>
              <div>
                <strong>Sobre o app</strong>
                <p>Saiba mais sobre o aplicativo</p>
              </div>
              <span className={style.seta}>&gt;</span>
            </div>
            <div className={style.item}>
              <div>
                <strong>Termos e privacidade</strong>
                <p>Termos de serviço e política de privacidade</p>
              </div>
              <span className={style.seta}>&gt;</span>
            </div>
            <div className={`${style.item} ${style.itemClicavel}`}>
              <strong className={style.sair}>Sair</strong>
            </div>
          </section>

        </main>

        {/* Coluna com o Perfil */}
        <aside className={style.colunaDireita}>
          <div className={style.perfilCard}>
            <p className={style.nomeUsuario}>Sofia Mendes</p>
            <p className={style.handleUsuario}>@sofiamendes</p>

            <ul className={style.linksPerfil}>
              <li><a href="#"><span>Perfil</span> <span className={style.seta}>&gt;</span></a></li>
              <li><a href="#"><span>Itens</span> <span className={style.seta}>&gt;</span></a></li>
              <li><a href="#"><span>Favoritos</span> <span className={style.seta}>&gt;</span></a></li>
              <li><a href="#" className={style.linkAtivo}><span>Configurações</span> <span className={style.seta}>&gt;</span></a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Configuracoes;
