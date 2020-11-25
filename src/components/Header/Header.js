import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from '../SearchForm/SearchForm';
import Navigation from '../Navigation/Navigation';
import hamburger from '../../images/hamburger.svg';
import hamburgerWhite from '../../images/hamburger_white.svg';
import hamburgerClose from '../../images/close.svg';

import './Header.css';

function Header({
  loggedIn,
  onLoginClick,
  onUnLoginClick,
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
    <header className={`header${location.pathname === '/saved-news' ? ' header_white' : ''}`}>
      <div className="header__wrapper">
        <span className={`header__logo${location.pathname === '/saved-news' ? ' header__logo_white' : ''}`} onClick={() => goTo('./')}>NewsExplorer</span>
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
              onLoginClick={onLoginClick}
              onUnLoginClick={onUnLoginClick}
            />
          </div>
        </div>
        <Navigation
          loggedIn={loggedIn}
          unSmallDesktop={true}
          onLoginClick={onLoginClick}
          onUnLoginClick={onUnLoginClick}
        />
        <img src={location.pathname === '/saved-news' ? hamburgerWhite : hamburger} alt="Открыть" className={`header__hamburger-img${location.pathname === '/saved-news' ? ' header__hamburger-img_white' : ''}`} onClick={toggleHamburger} />
      </div>
      <div className={`header__line${location.pathname === '/saved-news' ? ' header__line_white' : ''}`}></div>
      {location.pathname === '/' ? <SearchForm /> : ''}
    </header>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onUnLoginClick: PropTypes.func.isRequired,
};

export default Header;
