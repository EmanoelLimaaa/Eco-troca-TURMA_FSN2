import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCity, faVenusMars, faCamera } from '@fortawesome/free-solid-svg-icons';
import { cadastrarUsuario } from '../../services/usuarioService';
import styles from './CadUsuario.module.css';

function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    sexo: '',
    email: '',
    cidade: '',
    estado: '',
    senha: '',
    foto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: name === 'foto' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('email', form.email);
    formData.append('senha', form.senha);
    formData.append('cidade', form.cidade);
    formData.append('estado', form.estado);
    formData.append('tipo_usuario', 'comum');
    formData.append('idade', form.idade);
    formData.append('sexo', form.sexo);
    
    if (form.foto) {
      formData.append('foto', form.foto);
    }

    try {
      console.log('Enviando dados do formulário:', Object.fromEntries(formData));

      await cadastrarUsuario(formData);

      alert('Cadastro realizado com sucesso!');
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert(error.response?.data?.error || 'Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Cadastrar</h2>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <input type="number" name="idade" placeholder="Idade" value={form.idade} onChange={handleChange} min="0" required />


        </div>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faVenusMars} className={styles.icon} />
          <select name="sexo" value={form.sexo} onChange={handleChange} required>
            <option value="">Sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
            <option value="Prefiro não dizer">Prefiro não dizer</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faCity} className={styles.icon} />
          <input type="text" name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faCity} className={styles.icon} />
          <input type="text" name="estado" placeholder="Estado (UF)" value={form.estado} onChange={handleChange} maxLength="2" required />
        </div>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
        </div>

        <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faCamera} className={styles.icon} />
          <input type="file" name="foto" accept="image/*" onChange={handleChange} required />
        </div>

        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;
