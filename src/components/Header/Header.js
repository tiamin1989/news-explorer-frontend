import React/* , { useContext } */ from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../images/logo.svg';
/* import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; */

function Header({ loggedIn, onLogoClick }) {
  const location = useLocation();
  /* const { currentUser } = useContext(CurrentUserContext); */
  return (
    <header className="header">
      <img src={logo} alt="Логотип NewsExplorer" className="header__logo" onClick={onLogoClick} />
      <ul className="header__menu">
        <li className="header__menu-item">
          <Link to="/" className={`header__menu-item-link ${location.pathname === '/' ? 'header__menu-item-link_current' : ''}`}>Главная</Link>
        </li>
        {loggedIn
          ? (<li className="header__menu-item">
            <Link to="/saved-news" className={`header__menu-item-link ${location.pathname === '/saved-news' ? 'header__menu-item-link_current' : ''}`}>Сохраненные статьи</Link>
          </li>)(<li className="header__menu-item">
            <Link to="/me" className={`header__menu-item-link ${location.pathname === '/me' ? 'header__menu-item-link_current' : ''}`}>{/* {currentUser.name} */}</Link>
          </li>)
          : (<li className="header__menu-item">
            <Link to="/sign-up" className={`header__menu-item-link ${location.pathname === '/sign-up' ? 'header__menu-item-link_current' : ''}`}>Авторизоваться</Link>
          </li>)
        }
      </ul>
      <div className="header__line"></div>
    </header>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onLogoClick: PropTypes.func.isRequired,
};

export default Header;
