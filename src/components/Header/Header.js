import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import Navigation from '../Navigation/Navigation';
import hamburger from '../../images/hamburger.svg';
import hamburgerClose from '../../images/close.svg';

import './Header.css';

function Header({
  loggedIn,
}) {
  const location = useLocation();
  const history = useHistory();
  const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);

  function goTo(to) {
    history.push(to);
  }

  const toggleHamburger = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <span className="header__logo" onClick={() => goTo('./')}>NewsExplorer</span>
        <div className={`header__hamburger${isHamburgerActive ? ' header__hamburger_active' : ''}`}>
          <div className="header__hamburger-menu">
            <div className="header__hamburger-menu-wrapper">
              <span className="header__hamburger-logo">NewsExplorer</span>
              <img src={hamburgerClose} alt="Закрыть" className="header__close" onClick={toggleHamburger} />
            </div>
            <div className="header__hamburger-line" />
            <Navigation
              loggedIn={loggedIn}
              unSmallDesktop={false}
            />
          </div>
        </div>
        <Navigation
          loggedIn={loggedIn}
          unSmallDesktop={true}
        />
        <img src={hamburger} alt="Открыть" className="header__hamburger-img" onClick={toggleHamburger} />
      </div>
      <div className="header__line"></div>
      {location.pathname === '/' ? <SearchForm /> : ''}
    </header>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
