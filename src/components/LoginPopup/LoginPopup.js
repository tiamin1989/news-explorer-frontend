import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './LoginPopup.css';

function LoginPopup(
  {
    isOpen,
    onClose,
    onLogin,
    onRegisterClick,
  },
) {
  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
    onClose();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="login"
      title="Вход"
      isOpen={isOpen}
      onClose={onClose}>
      <label htmlFor="login-email" className="popup__label">Email</label>
      <input
        id="login-email"
        name="login-email"
        type="email"
        className="popup__input"
        placeholder="Введите почту"
        required
      />
      <span
        id="login-email-error"
        className="popup__error"
      />
      <label htmlFor="login-password" className="popup__label">Пароль</label>
      <input
        id="login-password"
        name="login-password"
        type="password"
        className="popup__input"
        placeholder="Введите пароль"
        required
      />
      <span
        id="login-password-error"
        className="popup__error"
      />
      <input
        type="submit"
        value="Войти"
        className="popup__submit-button"
      />
      <span className="popup__offer">или <a onClick={onRegisterClick} className="popup__offer-link" href="#">Зарегистрироваться</a></span>
    </PopupWithForm>
  );
}

LoginPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func,
  onRegisterClick: PropTypes.func,
};

export default LoginPopup;
