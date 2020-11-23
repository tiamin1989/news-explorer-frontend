import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Navigation.css';

function Navigation({ loggedIn, unSmallDesktop }) {
  const location = useLocation();

  return (
    unSmallDesktop ? (
      <>
        <ul className="header__nav">
          <li className={`header__nav-item ${location.pathname === '/' ? 'header__nav-item_current' : ''}`}>
            <Link to="/" className={`header__nav-item-link${location.pathname === '/saved-news' ? ' header__nav-item-link_white' : ''}`}>Главная</Link>
          </li>
          {loggedIn
            ? (<>
              <li className={`header__nav-item ${location.pathname === '/saved-news' ? 'header__nav-item_current_white' : ''}`}>
                <Link to="/saved-news" className={`header__nav-item-link${location.pathname === '/saved-news' ? ' header__nav-item-link_white' : ''}`}>Сохраненные статьи</Link>
              </li>
              <li className="header__nav-button">
                <Link to="/me" className={`header__nav-item-button header__nav-item-button_auth${location.pathname === '/saved-news' ? ' header__nav-item-button_white header__nav-item-button_auth_white' : ''}`}>Грета</Link>
              </li>
            </>)
            : (<li className="header__nav-button">
              <button className="header__nav-item-button">Авторизоваться</button>
            </li>)
          }
        </ul>
      </>
    )
      : (
        <>
          <ul className="header__nav-mobile">
            <li className="header__nav-mobile-item">
              <Link to="/" className="header__nav-mobile-item-link">Главная</Link>
            </li>
            {loggedIn
              ? (<>
                <li className="header__nav-mobile-item">
                  <Link to="/saved-news" className="header__nav-mobile-item-link">Сохраненные статьи</Link>
                </li>
              </>)
              : (<>
                <li className="header__nav-mobile-item">
                  <button className="header__nav-mobile-item-button">Авторизоваться</button>
                </li>
              </>)
            }
          </ul>
        </>
      )
  );
}

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  unSmallDesktop: PropTypes.bool.isRequired,
};

export default Navigation;
