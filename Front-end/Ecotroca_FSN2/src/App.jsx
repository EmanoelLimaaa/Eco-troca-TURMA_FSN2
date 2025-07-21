import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from "./components/AuthContext"
import EcoTrocaMenu from './components/EcoTrocaMenu';
import PublicarItem from './pages/PublicarItem';
import Home from './pages/Home';
import DetalhesItem from './pages/ItemDetalhes';
import Login from './pages/Login';
import MeuPerfil from './pages/MeuPerfil';
import CadUsuario from './pages/CadUsuario';
import TelaProposta from './pages/TelaPropostas';
import Configuracoes from './pages/Configuracoes';
import PerfilUsuario from './pages/PerfilUsuario';
import Mensagens from './pages/Mensagens';

function AppWithMenu() {
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || '/';
  
  return (
    <>
      <EcoTrocaMenu activePage={`/${activePage}`} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publicar" element={<PublicarItem />} />
        <Route path="/detalhes/:id" element={<DetalhesItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meuperfil" element={<MeuPerfil />} />
        <Route path="/CadUsuario" element={<CadUsuario />} />
        <Route path="/propostas/:id" element={<TelaProposta />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/perfilusuario" element={<PerfilUsuario />} />
        <Route path="/mensagens" element={<Mensagens />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppWithMenu />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;