import React from 'react';
import PropTypes from 'prop-types';

import './PopupWithForm.css';

function PopupWithForm(
  {
    title,
    name,
    children,
    isOpen,
    onClose,
    onSubmit,
  },
) {
  function handlePopupClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleEscPress(e) {
    if (e.key === 'Escape'
      || e.key === 'Esc'
      || e.keyCode === 27) onClose();
  }

  React.useEffect(
    () => {
      const body = document.querySelector('body');
      body.addEventListener('keydown', handleEscPress);
      return () => {
        body.removeEventListener('keydown', handleEscPress);
      };
    },
  );

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : 'popup_closed'}`} onClick={handlePopupClick}>
      <form className="popup__container" name={name} onSubmit={onSubmit} >
        <h2 className="popup__title">{title}</h2>
        <button type="button" className="popup__close" onClick={onClose} />
        {children}
      </form>
    </div>
  );
}

PopupWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default PopupWithForm;
