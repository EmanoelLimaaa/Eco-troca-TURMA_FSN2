import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EcoTrocaMenu.css';

// Ícone pra o menu
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

const EcoTrocaMenu = ({ variant }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let centerContent = null;
  let rightContent = null;

  switch (variant) {
    case 'home':
      rightContent = (
        <>
          <button className="button button-green" onClick={() => { navigate('/publicar'); setIsMenuOpen(false); }}>
            Cadastrar Item
          </button>
          <button className="button button-gray" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>
            Login
          </button>
        </>
      );
      break;

    case 'login':
      break;

    case 'publicarItem':
      centerContent = (
        <>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Início</Link>
          <Link to="/categorias" onClick={() => setIsMenuOpen(false)}>Categorias</Link>
          <Link to="/meus-itens" onClick={() => setIsMenuOpen(false)}>Meus Itens</Link>
          <Link to="/mensagens" onClick={() => setIsMenuOpen(false)}>Mensagens</Link>
        </>
      );
      rightContent = (
        <>
          <button className="icon-button" onClick={() => { alert('Notificações'); setIsMenuOpen(false); }}>
            <NotificationIcon />
          </button>
          <Link to="/meu-perfil" className="icon-button" onClick={() => setIsMenuOpen(false)}>
            <ProfileIcon />
          </Link>
        </>
      );
      break;

    case 'detalhesProduto':
      centerContent = (
        <>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Página Inicial</Link>
          <Link to="/categorias" onClick={() => setIsMenuOpen(false)}>Categorias</Link>
          <Link to="/minhas-trocas" onClick={() => setIsMenuOpen(false)}>Minhas Trocas</Link>
          <SearchBar />
        </>
      );
      rightContent = (
        <>
          <Link to="/meu-perfil" className="icon-button" onClick={() => setIsMenuOpen(false)}>
            <ProfileIcon />
          </Link>
        </>
      );
      break;

    case 'ofertaItem':
      rightContent = (
        <>
          <button className="icon-button" onClick={() => { alert('Notificações'); setIsMenuOpen(false); }}>
            <NotificationIcon />
          </button>
          <Link to="/meu-perfil" className="icon-button" onClick={() => setIsMenuOpen(false)}>
            <ProfileIcon />
          </Link>
        </>
      );
      break;

    default:
      break;
  }

  return (
    <header className="menu-container">
      <div className="menu-header">
        <div className="menu-left">
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>EcoTroca</Link>
        </div>
        <button className="hamburger-button" onClick={toggleMenu}>
          <HamburgerIcon />
        </button>
        <nav className="menu-center desktop-only">{centerContent}</nav>
        <div className="menu-right desktop-only">{rightContent}</div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <nav className="menu-center">{centerContent}</nav>
        <div className="menu-right">{rightContent}</div>
      </div>
    </header>
  );
};

export default EcoTrocaMenu;