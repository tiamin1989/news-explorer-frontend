import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup(
  {
    isOpen,
    onClose,
    onRegister,
    onLoginClick,
  },
) {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const nameRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="register"
      title="Регистрация"
      isOpen={isOpen}
      onClose={onClose}>
      <label htmlFor="register-email" className="popup__label">Email</label>
      <input
        ref={emailRef}
        id="register-email"
        name="register-email"
        type="email"
        className="popup__input"
        placeholder="Введите почту"
        required
      />
      <span
        id="register-email-error"
        className="popup__error"
      />
      <label htmlFor="register-password" className="popup__label">Пароль</label>
      <input
        ref={passwordRef}
        id="register-password"
        name="register-password"
        type="password"
        className="popup__input"
        placeholder="Введите пароль"
        required
      />
      <span
        id="register-password-error"
        className="popup__error"
      />
      <label htmlFor="register-name" className="popup__label">Имя</label>
      <input
        ref={nameRef}
        id="register-name"
        name="register-name"
        type="text"
        className="popup__input"
        placeholder="Введите имя"
        required
      />
      <span
        id="register-name-error"
        className="popup__error"
      />
      <input
        type="submit"
        value="Зарегистрироваться"
        className="popup__submit-button"
      />
      <span className="popup__offer">или <a onClick={onLoginClick} className="popup__offer-link" href="#" >Войти</a></span>
    </PopupWithForm>
  );
}

RegisterPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default RegisterPopup;
