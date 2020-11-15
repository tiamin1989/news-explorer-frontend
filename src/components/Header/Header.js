import React/* , { useContext } */ from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
/* import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; */

import './Header.css';

function Header({ loggedIn, onClick }) {
  const location = useLocation();
  const history = useHistory();
  /* const { currentUser } = useContext(CurrentUserContext); */

  function goToAuthorization() {
    onClick();
    history.push('./sign-up');
  }

  return (
    <header className="header">
      <div className="header__wrapper">
        <span className="header__logo">NewsExplorer</span>
        <ul className="header__menu">
          <li className={`header__menu-item ${location.pathname === '/' ? 'header__menu-item_current' : ''}`}>
            <Link to="/" className="header__menu-item-link">Главная</Link>
          </li>
          {loggedIn
            ? (<li className={`header__menu-item ${location.pathname === '/saved-news' ? 'header__menu-item_current' : ''}`}>
              <Link to="/saved-news" className="header__menu-item-link">Сохраненные статьи</Link>
            </li>)(<li className={`header__menu-item ${location.pathname === '/me' ? 'header__menu-item_current' : ''}`}>
              <Link to="/me" className="header__menu-item-link">{/* {currentUser.name} */}</Link>
            </li>)
            : (<li className="header__menu-button">
              <button className="header__menu-item-button" onClick={goToAuthorization}>Авторизоваться</button>
            </li>)
          }
        </ul>
      </div>
      <div className="header__line"></div>
      <div className="header__search-wrapper">
        <h1 className="header__title">Что творится в мире?</h1>
        <p className="header__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <div className="header__search"></div>
      </div>
    </header>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Header;
