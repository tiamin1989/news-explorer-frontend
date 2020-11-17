import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
      <div className="footer__wrapper">
        <ul className="footer__menu">
          <li className="footer__menu-item">
            <Link to="/" className="footer__menu-item-link">Главная</Link>
          </li>
          <li className="footer__menu-item">
            <a
              target="_blank"
              href="https://praktikum.yandex.ru/"
              rel="noreferrer"
              className="footer__menu-item-link"
            >Яндекс.Практикум</a>
          </li>
        </ul>
        <ul className="footer__socials">
          <li className="footer__socials-item footer__socials-item_github" />
          <li className="footer__socials-item footer__socials-item_facebook" />
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
