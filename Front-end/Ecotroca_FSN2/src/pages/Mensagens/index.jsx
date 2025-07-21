import React, { useState } from 'react';
import MensagemCard from '../../components/MensagemCard';
import style from './Mensagens.module.css';
import EcoTrocaMenu from '../../components/EcoTrocaMenu';
import AvatarMensagem from '../../assets/AvatarMensagem/avatar.png';
import Footer from '../../components/Footer';

const mensagensFake = [
  {
    id: 1,
    nome: 'Pedro Silva',
    mensagem: 'Tenho interesse no seu item',
    data: '10 min',
    avatar: AvatarMensagem,
    conteudo: 'Olá, tudo bem? Gostaria de saber mais sobre a bicicleta que você está oferecendo.',
  },
  {
    id: 2,
    nome: 'Amélia Poulain',
    mensagem: 'Gostei do seu produto',
    data: '2 horas',
    avatar: AvatarMensagem,
    conteudo: 'Oi, vi que você está trocando uma câmera fotográfica que me interessa. Podemos conversar?',
  },
  {
    id: 3,
    nome: 'Jim Root',
    mensagem: 'Obrigado pelo interesse',
    data: '01/07/2025',
    avatar: AvatarMensagem,
    conteudo: 'Agradeço pelo seu interesse pela guitarra. Quando podemos combinar a troca?',
  },
  {
    id: 4,
    nome: 'Allan Poe',
    mensagem: 'Dúvida sobre a troca',
    data: '6 horas',
    avatar: AvatarMensagem,
    conteudo: 'Oi, tenho uma dúvida sobre como funciona a troca de livros. Poderia me explicar?',
  },
  {
    id: 5,
    nome: 'Maria Souza',
    mensagem: 'Ainda está disponível?',
    data: '3 dias',
    avatar: AvatarMensagem,
    conteudo: 'Oi, vi que você está oferecendo um item que me interessa. Podemos conversar sobre a troca?',
  },
];

function Mensagens() {
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null);
  const [respostaTexto, setRespostaTexto] = useState('');
  const [respostas, setRespostas] = useState({});

  const enviarResposta = () => {
    if (mensagemSelecionada && respostaTexto.trim() !== '') {
      setRespostas((prev) => ({
        ...prev,
        [mensagemSelecionada.id]: [...(prev[mensagemSelecionada.id] || []), respostaTexto],
      }));
      setRespostaTexto('');
    }
  };

  return (
    <div className={style.page}>
      <EcoTrocaMenu variant="Mensagens" />
      <div className={style.container}>
        <h1 className={style.titulo}>Mensagens</h1>
        <div className={style.grid}>
          <main className={style.colunaEsquerda}>
            {mensagensFake.map((m) => (
              <MensagemCard
                key={m.id}
                nome={m.nome}
                mensagem={m.mensagem}
                data={m.data}
                avatar={m.avatar}
                onClick={() => setMensagemSelecionada(m)}
              />
            ))}
          </main>

          <aside className={style.colunaDireita}>
            {mensagemSelecionada ? (
              <div className={style.mensagemDetalhe}>
                <img
                  src={mensagemSelecionada.avatar}
                  alt={mensagemSelecionada.nome}
                  className={style.avatarDetalhe}
                />
                <div className={style.conteudo}>
                  <h3>{mensagemSelecionada.nome}</h3>
                  <p>{mensagemSelecionada.conteudo}</p>

                  {respostas[mensagemSelecionada.id]?.map((r, i) => (
                    <div key={i} className={style.resposta}>
                      <strong>Você:</strong> {r}
                    </div>
                  ))}

                  <form
                    className={style.formResposta}
                    onSubmit={(e) => {
                      e.preventDefault();
                      enviarResposta();
                    }}
                  >
                    <textarea
                      className={`${style.textarea} ${style.piscando}`}
                      value={respostaTexto}
                      onChange={(e) => setRespostaTexto(e.target.value)}
                      placeholder="Digite sua resposta..."
                      rows={3}
                    />
                    <button type="submit" className={style.botaoEnviar}>Enviar</button>
                  </form>
                </div>
              </div>
            ) : (
              <div className={style.selecioneMensagem}>
                <h3>Visualização da Mensagem</h3>
                <p>Selecione uma mensagem para ver os detalhes.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default Mensagens;
