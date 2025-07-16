import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || senha === "") {
      setErro("Preencha todos os campos.");
      return;
    }

    if (email === "usuario@ecotroca.com" && senha === "123456") {
      alert("Login realizado com sucesso!");
      navigate('/');     
      // Aqui você pode redirecionar, ex: navigate('/perfil')
    } else {
      setErro("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className={styles.container}>
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

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
