import React from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import hamburger from '../../images/hamburger.svg';

import './Navigation.css';

function Navigation({ loggedIn, onClick }) {
  const location = useLocation();
  const history = useHistory();

  function goToAuthorization() {
    onClick();
    history.push('./sign-up');
  }

  return (
    <>
      <ul className="header__nav">
        <li className={`header__nav-item ${location.pathname === '/' ? 'header__nav-item_current' : ''}`}>
          <Link to="/" className="header__nav-item-link">Главная</Link>
        </li>
        {loggedIn
          ? (<li className={`header__nav-item ${location.pathname === '/saved-news' ? 'header__nav-item_current' : ''}`}>
            <Link to="/saved-news" className="header__nav-item-link">Сохраненные статьи</Link>
          </li>)(<li className={`header__nav-item ${location.pathname === '/me' ? 'header__nav-item_current' : ''}`}>
            <Link to="/me" className="header__nav-item-link">{/* {currentUser.name} */}</Link>
          </li>)
          : (<li className="header__nav-button">
            <button className="header__nav-item-button" onClick={goToAuthorization}>Авторизоваться</button>
          </li>)
        }
      </ul>
      <img src={hamburger} className="header__hamburger" />
    </>
  );
}

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Navigation;
