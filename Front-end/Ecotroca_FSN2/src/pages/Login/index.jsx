import React, { useState, useContext, useEffect } from "react";
import styles from "./Login.module.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';
import imgFundo from '../../assets/imgLogin/troca.webp';

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login, isLoggedIn } = useContext(AuthContext);
  
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      await login(email, senha);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErro("E-mail ou senha incorretos.");
    }
  };

  return (
  <div
    className={styles.container}
    style={{
      backgroundImage: `url(${imgFundo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
    }}
  >
    <div className={styles.overlay}></div>

    <h1 className={styles.logo}>EcoTroca</h1>
    <form onSubmit={handleLogin} className={styles.form}>
      <h2 className={styles.title}>Login</h2>

      {erro && <p className={styles.error}>{erro}</p>}

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className={styles.input}
      />

      <Link to="/CadUsuario" className={styles.linkCadastro}>
        <h4>Não tem uma conta? Cadastre-se aqui</h4>
      </Link>

      <button type="submit" className={styles.button}>
        Entrar
      </button>
    </form>
  </div>
);

}

export default Login;
