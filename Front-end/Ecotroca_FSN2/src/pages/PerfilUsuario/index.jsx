import React, { useState, useRef, useEffect, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import style from "./PerfilUsuario.module.css";
import EcoTrocaMenu from "../../components/EcoTrocaMenu";
import Footer from '../../components/Footer';
import { AuthContext } from '../../components/AuthContext';
import { getCurrentUser, updateProfile } from '../../services/authService';

function PerfilUsuario() {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    endereco: "",
    telefone: "",
    interesses: "",
    notificacoes: "",
    foto: "",
  });
  const [tempDados, setTempDados] = useState({ ...dados });

  const nomeInputRef = useRef(null);

  // Carregar dados do usuário do backend
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getCurrentUser();
        console.log('Dados do usuário recebidos:', userData);
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const formattedData = {
          nome: userData.nome || "",
          email: userData.email || "",
          endereco: userData.endereco || "",
          telefone: userData.telefone || "",
          interesses: userData.interesses || "",
          notificacoes: userData.notificacoes || "",
          foto: userData.imagem_perfil ? `${baseURL}${userData.imagem_perfil}` : "",
        };
        console.log('Dados formatados:', formattedData);
        setDados(formattedData);
        setTempDados(formattedData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  useEffect(() => {
    if (editMode && nomeInputRef.current) {
      nomeInputRef.current.focus();
    }
  }, [editMode]);

  const handleEdit = () => {
    setTempDados({ ...dados });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setShowModal(false);
  };

  const handleChange = (e) => {
    setTempDados({ ...tempDados, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Preparar dados para enviar ao backend
      const dataToUpdate = {
        nome: tempDados.nome,
        email: tempDados.email,
        endereco: tempDados.endereco,
        telefone: tempDados.telefone,
        interesses: tempDados.interesses,
        notificacoes: tempDados.notificacoes,
      };

      // Enviar para o backend
      await updateProfile(dataToUpdate);

      // Atualizar dados locais
      setDados(tempDados);
      setEditMode(false);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados. Tente novamente.');
    }
  };

  const handlePhotoClick = () => {
    if (editMode) setShowModal(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTempDados({ ...tempDados, foto: url });
      setDados({ ...dados, foto: url });
      setShowModal(false);
    }
  };

  const fields = [
    { id: "nome", label: "Nome", name: "nome", ref: nomeInputRef },
    { id: "email", label: "Email", name: "email" },
    { id: "endereco", label: "Endereço", name: "endereco" },
    { id: "telefone", label: "Telefone", name: "telefone" },
    { id: "interesses", label: "Categorias de Interesse", name: "interesses" },
    { id: "notificacoes", label: "Notificações", name: "notificacoes" },
  ];

  if (loading) {
    return (
      <>
        <EcoTrocaMenu variant="perfilUsuario" />
        <main className={style.main}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Carregando dados do perfil...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <EcoTrocaMenu variant="perfilUsuario" />
      <main className={style.main}>
        <div
          className={style.avatarContainer}
          onClick={handlePhotoClick}
          title={editMode ? "Mudar foto" : ""}
          role={editMode ? "button" : undefined}
          tabIndex={editMode ? 0 : -1}
        >
          {dados.foto ? (
            <img className={style.avatar} src={dados.foto} alt="Foto do Perfil" />
          ) : (
            <FaUserCircle className={style.avatarPlaceholder} aria-hidden="true" />
          )}
        </div>

        <div className={style.profileWrapper}>
          {["nome", "email", "endereco"].map((key) => (
            <div
              key={key}
              className={style[key]}
              contentEditable={false}
              tabIndex={-1}
              onClick={(e) => e.preventDefault()}
            >
              {dados[key]}
            </div>
          ))}
        </div>

        <section className={style.section}>
          <h2 className={style.sectionTitle} contentEditable={false} tabIndex={-1}>
            Detalhes da Conta
          </h2>
          <div className={style.grid}>
            {fields.slice(0, 4).map(({ id, label, name, ref }) => (
              <div key={id}>
                <label className={style.label} htmlFor={id} contentEditable={false} tabIndex={-1}>
                  {label}
                </label>
                {editMode ? (
                  <input
                    ref={ref}
                    id={id}
                    className={style.input}
                    name={name}
                    value={tempDados[name]}
                    onChange={handleChange}
                  />
                ) : (
                  <div
                    className={style.value}
                    contentEditable={false}
                    tabIndex={-1}
                    onClick={(e) => e.preventDefault()}
                  >
                    {dados[name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className={style.section}>
          <h2 className={style.sectionTitle} contentEditable={false} tabIndex={-1}>
            Preferências
          </h2>
          <div className={style.grid}>
            {fields.slice(4).map(({ id, label, name }) => (
              <div key={id}>
                <label className={style.label} htmlFor={id} contentEditable={false} tabIndex={-1}>
                  {label}
                </label>
                {editMode ? (
                  <input
                    id={id}
                    className={style.input}
                    name={name}
                    value={tempDados[name]}
                    onChange={handleChange}
                  />
                ) : (
                  <div
                    className={style.value}
                    contentEditable={false}
                    tabIndex={-1}
                    onClick={(e) => e.preventDefault()}
                  >
                    {dados[name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className={style.buttonWrapper}>
          {editMode ? (
            <>
              <button className={style.saveBtn} onClick={handleSave}>
                Salvar
              </button>
              <button className={style.cancelBtn} onClick={handleCancel}>
                Cancelar
              </button>
            </>
          ) : (
            <button className={style.editButton} onClick={handleEdit}>
              Editar Perfil
            </button>
          )}
        </div>
      </main>

      {showModal && (
        <div
          className={style.modalOverlay}
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
        >
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 id="modalTitle">Selecione uma foto</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button className={style.cancelBtn} onClick={() => setShowModal(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PerfilUsuario;