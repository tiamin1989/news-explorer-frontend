import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header({ loggedIn, onClick }) {
  const location = useLocation();
  const history = useHistory();

  function goTo(to) {
    history.push(to);
  }

  return (
    <header className="header">
      <div className="header__wrapper">
        <span className="header__logo" onClick={() => goTo('./')}>NewsExplorer</span>
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
