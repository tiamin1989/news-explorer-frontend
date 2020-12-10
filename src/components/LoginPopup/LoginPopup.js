import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './LoginPopup.css';
import { useFormWithValidation } from '../FormValidator/FormValidator';

function LoginPopup(
  {
    isOpen,
    onClose,
    onLogin,
    onRegisterClick,
  },
) {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const emailValidation = useFormWithValidation();

  const handleChange = (e) => {
    emailValidation.resetForm();
    emailValidation.handleChange(e);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
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
        ref={emailRef}
        id="login-email"
        name="login-email"
        onChange={handleChange}
        value={emailValidation.values['login-email'] || ''}
        type="email"
        className="popup__input"
        placeholder="Введите почту"
        required
      />
      <span
        id="login-email-error"
        className="popup__error"
      >
        {emailValidation.errors['login-email']}
      </span>
      <label htmlFor="login-password" className="popup__label">Пароль</label>
      <input
        ref={passwordRef}
        id="login-password"
        name="login-password"
        onChange={handleChange}
        value={emailValidation.values['login-password'] || ''}
        type="password"
        className="popup__input"
        placeholder="Введите пароль"
        required
      />
      <span
        id="login-password-error"
        className="popup__error"
      >
        {emailValidation.errors['login-password']}
      </span>
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
