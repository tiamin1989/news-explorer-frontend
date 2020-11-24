import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './SuccessMessagePopup.css';

function SuccessMessagePopup(
  {
    isOpen,
    onClose,
    onLoginClick,
  },
) {
  function handleLoginClick() {
    onClose();
    onLoginClick();
  }

  return (
    <PopupWithForm
      name="success"
      title="Пользователь успешно зарегистрирован!"
      isOpen={isOpen}
      onClose={onClose}>
      <span className="popup__offer popup__offer_left"><a onClick={handleLoginClick} className="popup__offer-link" href="#" >Войти</a></span>
    </PopupWithForm>
  );
}

SuccessMessagePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default SuccessMessagePopup;
