import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EcoTrocaMenu.css';

export default function EcoTrocaMenu() {
  const location = useLocation();
  const currentPath = location.pathname;

  const commonElements = {
    logo: <Link to="/" className="logo">EcoTroca</Link>,
    profileIcon: (
      <Link to="/meu-perfil" className="profile-icon" aria-label="Perfil">
        <FaRegUserCircle size={24} />
      </Link>
    ),
    notificationIcon: (
      <button className="icon-button" aria-label="Notificações">
        <FiBell size={20} />
      </button>
    ),
    chatIcon: (
      <Link to="/mensagens" className="icon-button" aria-label="Mensagens">
        <FiMessageSquare size={20} />
      </Link>
    )
  };

  useEffect(() => {
    const handleScroll = () => {
      const menu = document.querySelector('.eco-menu');
      if (menu) {
        if (window.scrollY > 10) {
          menu.classList.add('scrolled');
        } else {
          menu.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMenuConfig = () => {
    const configs = {
      '/': {
        centerItems: [
        ],
        rightItems: [
          <Link to="/cadastrar-item" key="cadastrar" className="auth-link primary">Cadastrar Item</Link>,
          <Link to="/login" key="login" className="auth-link login">Login</Link>,
        ]
      },
      '/login': null,
      '/publicar-item': {
        centerItems: [
          { path: '/', label: 'Inicio' },
          { path: '/categorias', label: 'Categorias' },
          { path: '/meus-itens', label: 'Meus Itens' },
          { path: '/mensagens', label: 'Mensagens' }
        ],
        rightItems: [
          commonElements.notificationIcon,
          commonElements.chatIcon,
          commonElements.profileIcon
        ]
      },
      '/meu-perfil': {
        centerItems: [],
        rightItems: [
          <Link to="/configuracoes" key="settings" className="icon-button" aria-label="Configurações">
            <FaCog size={20} />
          </Link>,
          commonElements.profileIcon
        ]
      },
      '/detalhes-produto': {
        centerItems: [
          { path: '/', label: 'Página Inicial' },
          { path: '/categorias', label: 'Categorias' },
          { path: '/minhas-trocas', label: 'Minhas trocas' }
        ],
        rightItems: [
          <div className="search-box" key="search">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Pesquisar" aria-label="Pesquisar" />
          </div>,
          commonElements.notificationIcon,
          commonElements.chatIcon,
          commonElements.profileIcon
        ]
      },
      '/configuracoes': {
        centerItems: [
          { path: '/', label: 'Inicio' },
          { path: '/categorias', label: 'Categorias' },
          { path: '/favoritos', label: 'Favoritos' },
          { path: '/mensagens', label: 'Mensagens' }
        ],
        rightItems: [
          commonElements.notificationIcon,
          commonElements.chatIcon,
          commonElements.profileIcon
        ]
      },
      '/mensagens': {
        centerItems: [],
        rightItems: [
          commonElements.notificationIcon,
          commonElements.profileIcon
        ]
      },
      '/oferta-item': {
        centerItems: [],
        rightItems: [
          commonElements.notificationIcon,
          commonElements.profileIcon
        ]
      }
    };
    return configs[currentPath] || {
      centerItems: [],
      rightItems: [
        commonElements.notificationIcon,
        commonElements.chatIcon,
        commonElements.profileIcon
      ]
    };
  };

  const config = getMenuConfig();
  if (!config) return null;

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