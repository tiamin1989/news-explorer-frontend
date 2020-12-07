import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function MessagePopup(
  {
    isOpen,
    onClose,
    name,
    title,
    content,
  },
) {
  return (
    <PopupWithForm
      name={name}
      title={title}
      isOpen={isOpen}
      onClose={onClose}>
      {content}
    </PopupWithForm>
  );
}

MessagePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
};

export default MessagePopup;
