import React/* , { useContext } */ from 'react';
/* import { useLocation, Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'; */
/* import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; */

import './Footer.css';
import aboutPhoto from '../../images/about-photo.png';

function Footer(/* { loggedIn, onClick } */) {
  /*   const location = useLocation();
    const history = useHistory(); */
  /* const { currentUser } = useContext(CurrentUserContext); */
  /*   function goToAuthorization() {
      onClick();
      history.push('./sign-up');
    } */

  return (
    <footer className="footer">
      <img src={aboutPhoto} alt="Это я" className="footer__about-photo" />
      <div className="footer__about-wrapper">
        <h2 className="footer__title">Об авторе</h2>
        <p className="footer_description">
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут,
          чем вы занимаетесь, какими технологиями разработки владеете.
        </p>
        <p className="footer_description">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и
          чем можете помочь потенциальным заказчикам.
        </p>
      </div>
    </footer>
  );
}

/* Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}; */

export default Footer;
