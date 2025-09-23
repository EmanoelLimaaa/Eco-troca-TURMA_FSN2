import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import imgFundo from "../../assets/imgLogin/troca.webp"; // ajuste conforme necessário
import { AuthContext } from "../../components/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [step, setStep] = useState("login"); // controla a tela atual
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // === LOGIN ===
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await login(email, senha);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // === RECUPERAÇÃO DE SENHA ===
  const handleRecovery = (e) => {
    e.preventDefault();

    if (email === "" || codigo === "") {
      setErro("Preencha todos os campos.");
      return;
    }

    // Aqui você validaria o código recebido no e-mail
    alert("Código validado! Agora você pode redefinir sua senha.");
    setStep("reset");
  };

  // === REDEFINIR SENHA ===
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (novaSenha === "" || confirmaSenha === "") {
      setErro("Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmaSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // Aqui você salvaria a nova senha no backend
    alert("Senha redefinida com sucesso!");
    setStep("login"); // volta para login
    setSenha("");
    setNovaSenha("");
    setConfirmaSenha("");
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${imgFundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <div className={styles.overlay}></div>

      <h1 className={styles.logo}>EcoTroca</h1>

      {/* === LOGIN === */}
      {step === "login" && (
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

          <button
            type="button"
            className={styles.linkRecuperar}
            onClick={() => setStep("recovery")}
          >
            Esqueci minha senha
          </button>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      )}

      {/* === RECUPERAÇÃO (e-mail + código) === */}
      {step === "recovery" && (
        <form onSubmit={handleRecovery} className={styles.form}>
          <h2 className={styles.title}>Recuperar Senha</h2>

          <div className={styles.developmentNotice}>
            <p>⚠️ Esta funcionalidade está em desenvolvimento. Em breve você poderá recuperar sua senha.</p>
          </div>

          {erro && <p className={styles.error}>{erro}</p>}

          <input
            type="email"
            placeholder="Digite seu e-mail cadastrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <input
            type="text"
            placeholder="Digite o código enviado ao e-mail"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Confirmar Código
          </button>

          <button
            type="button"
            className={styles.linkRecuperar}
            onClick={() => setStep("login")}
          >
            Voltar ao login
          </button>
        </form>
      )}

      {/* === REDEFINIÇÃO DE SENHA === */}
      {step === "reset" && (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <h2 className={styles.title}>Redefinir Senha</h2>

          {erro && <p className={styles.error}>{erro}</p>}

          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Confirme a nova senha"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Redefinir Senha
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;