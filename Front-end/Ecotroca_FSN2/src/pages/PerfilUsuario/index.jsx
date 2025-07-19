import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import style from "./PerfilUsuario.module.css";
import EcoTrocaMenu from "../../components/EcoTrocaMenu";

function PerfilUsuario() {
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dados, setDados] = useState({
    nome: "Sofia Mendes",
    email: "sofia.mendes@email.com",
    endereco: "Rua das Flores, 123, Lisboa, Portugal",
    telefone: "+351 912 345 678",
    interesses: "Roupas, Livros, Eletrônicos",
    notificacoes: "Email, App",
    foto: "",
  });
  const [tempDados, setTempDados] = useState({ ...dados });

  const nomeInputRef = useRef(null);

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

  const handleSave = (e) => {
    e.preventDefault();
    setDados(tempDados);
    setEditMode(false);
    setShowModal(false);
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
    </>
  );
}

export default PerfilUsuario;