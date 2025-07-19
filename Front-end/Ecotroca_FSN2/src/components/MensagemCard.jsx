import React from 'react';
import style from './MensagemCard.module.css';

/**
 * Componente que exibe um cartão de mensagem com avatar, nome, mensagem e data.
 * @param {string} nome - Nome do remetente.
 * @param {string} mensagem - Última mensagem enviada.
 * @param {string} data - Data ou hora da mensagem.
 * @param {string} avatar - Caminho ou URL da imagem do avatar.
 * @param {function} onClick - Função chamada ao clicar no card.
 */
function MensagemCard({ nome, mensagem, data, avatar, onClick }) {
  return (
    <div className={style.card} onClick={onClick}>
      <div className={style.info}>
        <img src={avatar} alt={`Avatar de ${nome}`} className={style.avatar} />

        <div>
          <div className={style.nome}>{nome}</div>
          <div className={style.mensagem}>{mensagem}</div>
        </div>
      </div>

      <div className={style.data}>{data}</div>
    </div>
  );
}

export default MensagemCard;
