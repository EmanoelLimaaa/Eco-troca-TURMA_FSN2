import React, { useState, useContext, useEffect } from 'react';
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
    { label: 'Início', path: '/', type: 'button-gray' },
    { label: 'Login', path: '/login', type: 'button-gray' },
    { label: 'Cadastro', path: '/CadUsuario', type: 'button-gray' },
  ],
  loggedIn: [
    { label: 'Início', path: '/', type: 'button-gray' },
    { label: 'Publicar Item', path: '/publicar', type: 'button-green' },
    { label: 'Meus Itens', path: '/meuperfil', type: 'button-gray' },
    { label: 'Mensagens', path: '/mensagens', type: 'button-gray' },
    { label: 'Configurações', path: '/configuracoes', type: 'button-gray' },
    { label: 'Pesquisar', type: 'search', showIn: ['item-detalhes', 'perfil-usuario'] },
    { label: 'Notificações', type: 'icon-button', icon: <NotificationIcon /> },
    { label: 'Meu Perfil', path: '/meuperfil', type: 'icon-button', icon: <ProfileIcon /> },
  ],
};

const EcoTrocaMenu = ({ activePage }) => {
  const { isLoggedIn, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Fecha o menu quando o estado de autenticação mudar
  useEffect(() => {
    setIsMenuOpen(false);
  }, [isLoggedIn]);

  const menuItems = isLoggedIn ? menuConfig.loggedIn : menuConfig.loggedOut;

  // notificações ficticias pra depois substituir por reais quando tiver o back, se a gente for ter. Se não, deixa assim mesmo
  const notifications = [
    { id: 1, message: 'Nova oferta na sua bicicleta!' },
    { id: 2, message: 'Mensagem de João sobre troca.' },
    { id: 3, message: 'Item publicado com sucesso!' },
  ];

  const renderMenuItem = (item) => {
    if (item.showIn && !item.showIn.includes(activePage)) {
      return null;
    }

    if (item.type === 'button-green' || item.type === 'button-gray') {
      return (
        <button
          key={item.label}
          className={`button ${item.type} ${item.path === activePage ? 'active' : ''}`}
          onClick={() => {
            navigate(item.path);
            setIsMenuOpen(false);
          }}
        >
          {item.label}
        </button>
      );
    } else if (item.type === 'icon-button') {
      if (item.label === 'Notificações') {
        return (
          <div key={item.label} className="notification-container">
            <button
              className="icon-button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              {item.icon}
            </button>
            {isNotificationsOpen && (
              <div className="notification-dropdown">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="notification-item">
                      {notif.message}
                    </div>
                  ))
                ) : (
                  <div className="notification-item">Nenhuma notificação</div>
                )}
              </div>
            )}
          </div>
        );
      }
      return (
        <button
          key={item.label}
          className="icon-button"
          onClick={() => {
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
        <div className="menu-right desktop-only">
          {menuItems.map(renderMenuItem)}
        </div>
      </div>
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {menuItems.map(renderMenuItem)}
        {isLoggedIn && (
          <button
            className="button button-gray"
            onClick={async () => {
              try {
                await logout();
                setIsMenuOpen(false);
                navigate('/login');
              } catch (error) {
                console.error('Erro ao fazer logout:', error);
              }
            }}
          >
            Sair
          </button>
        )}
      </div>
    </header>
  );
};

export default EcoTrocaMenu;