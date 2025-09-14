import React, { useState } from "react";
import styles from "./TelaPropostas.module.css";
import EcoTrocaMenu from "../../components/EcoTrocaMenu";

function TelaPropostas() {
  const [form, setForm] = useState({
    nome: "",
    item: "",
    imagem: null,
    data: "",
    telefone: "",
    descricao: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: name === "imagem" ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nome", form.nome);
      formData.append("item", form.item);
      formData.append("data", form.data);
      formData.append("telefone", form.telefone);
      formData.append("descricao", form.descricao);

      if (form.imagem) {
        formData.append("imagem", form.imagem);
      }

      const response = await fetch("http://localhost:3000/propostas", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.msg);
      console.log(result);

    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      alert("Erro ao enviar proposta.");
    }
  };


  return (
    <>
      <EcoTrocaMenu variant="proposta" />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Criar Proposta de Troca</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              name="item"
              placeholder="Nome do item que oferece"
              value={form.item}
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="tel"
              name="telefone"
              placeholder="Número de contato"
              value={form.telefone}
              onChange={handleChange}
              className={styles.input}
            />

            <textarea
              name="descricao"
              placeholder="Descrição da proposta"
              value={form.descricao}
              onChange={handleChange}
              className={styles.textarea}
            />

            <button type="submit" className={styles.submitButton}>
              Enviar Proposta
            </button>
          </form>

        </div>
      </div>
    </>
  );
}

export default TelaPropostas;
