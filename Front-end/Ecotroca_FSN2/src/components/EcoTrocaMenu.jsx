import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './EcoTrocaMenu.css';

// os icones
const NotificationIcon = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ProfileIcon = () => <div className="profile-circle"></div>;

const SearchBar = () => <input type="search" placeholder="Pesquisar..." className="search-bar" />;

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// a configuração do menu
const menuConfig = {
  loggedOut: [
    { label: 'Início', path: '/' },
    { label: 'Categorias', path: '/' },
    { label: 'Pulicar Item', path: '/publicar', type: 'button-green' },
    { label: 'Login', path: '/login', type: 'button-gray' },
    { label: 'Cadastro', path: '/CadUsuario', type: 'button-gray' },
  ],
  loggedIn: [
    { label: 'Início', path: '/' },
    { label: 'Categorias', path: '/' },
    { label: 'Meus Itens', path: '/meuperfil' },
    { label: 'Mensagens', path: '/mensagens' },
    { label: 'Minhas Trocas', path: '/meuperfil' },
    { label: 'Aceitar Oferta', path: '/propostas/:id' },
    { label: 'Configurações', path: '/configuracoes' },
    { label: 'Pesquisar', type: 'search', showIn: ['item-detalhes', 'perfil-usuario'] },
    { label: 'Notificações', action: () => alert('Notificações'), type: 'icon-button' },
    { label: 'Meu Perfil', path: '/meuperfil', type: 'icon-button', icon: <ProfileIcon /> },
  ],
};

const EcoTrocaMenu = ({ activePage }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = isLoggedIn ? menuConfig.loggedIn : menuConfig.loggedOut;

  const renderMenuItem = (item) => {
    if (item.showIn && !item.showIn.includes(activePage)) {
      return null;
    }

    if (item.type === 'button-green' || item.type === 'button-gray') {
      return (
        <button
          key={item.label}
          className={`button ${item.type}`}
          onClick={() => {
            navigate(item.path);
            setIsMenuOpen(false);
          }}
        >
          {item.label}
        </button>
      );
    } else if (item.type === 'icon-button') {
      return (
        <button
          key={item.label}
          className="icon-button"
          onClick={() => {
            if (item.action) item.action();
            if (item.path) navigate(item.path);
            setIsMenuOpen(false);
          }}
        >
          {item.icon || item.label}
        </button>
      );
    } else if (item.type === 'search') {
      return <SearchBar key={item.label} />;
    }
    return (
      <Link
        key={item.label}
        to={item.path}
        className={item.path === activePage ? 'active' : ''}
        onClick={() => setIsMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="menu-container">
      <div className="menu-header">
        <div className="menu-left">
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
            EcoTroca
          </Link>
        </div>
        <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <HamburgerIcon />
        </button>
        <nav className="menu-center desktop-only">
          {menuItems
            .filter((item) => !item.type || item.type === 'search')
            .map(renderMenuItem)}
        </nav>
        <div className="menu-right desktop-only">
          {menuItems
            .filter((item) => item.type && item.type !== 'search')
            .map(renderMenuItem)}
        </div>
      </div>
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {menuItems.map(renderMenuItem)}
      </div>
    </header>
  );
};

export default EcoTrocaMenu;