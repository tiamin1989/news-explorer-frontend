import React/* , { useContext } */ from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import Navigation from '../Navigation/Navigation';
/* import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; */

import './Header.css';

function Header({ loggedIn, onClick }) {
  const location = useLocation();
  /* const { currentUser } = useContext(CurrentUserContext); */

  return (
    <header className="header">
      <div className="header__wrapper">
        <span className="header__logo">NewsExplorer</span>
        <Navigation
          loggedIn={loggedIn}
          onClick={onClick}
        />
      </div>
      <div className="header__line"></div>
      {location.pathname === '/' ? <SearchForm /> : ''}
    </header>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Header;
