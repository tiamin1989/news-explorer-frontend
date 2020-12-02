import React from 'react';
import './SavedNewsCard.css';
import PropTypes from 'prop-types';

function SavedNewsCard({
  keyword,
  text,
  date,
  source,
  title,
  link,
  image,
}) {
  const message = React.useRef(null);

  function showMessage(e) {
    if (e.target === e.currentTarget) {
      e.target.classList.add('card-list__card-added_active');
      message.current.classList.add('card-list__card-message_active');
    }
  }

  function hideMessage(e) {
    if (e.target === e.currentTarget) {
      e.target.classList.remove('card-list__card-added_active');
      message.current.classList.remove('card-list__card-message_active');
    }
  }

  function onCardClick() {
    window.open(link, "_blank");
  }

  return (
    <li className="card-list__news-card" onClick={onCardClick}>
      <span className="card-list__card-category">{keyword}</span>
      <img src={image} alt="Изображение новости" className="card-list__card-image" />
      <button className="card-list__card-added card-list__card-added_delete" onMouseEnter={showMessage} onMouseLeave={hideMessage} />
      <span ref={message} className="card-list__card-message card-list__card-message_big">Убрать из сохранённых</span>
      <div className="card-list__wrapper">
        <span className="card-list__card-date">{date}</span>
        <h2 className="card-list__card-title">{title}</h2>
        <p className="card-list__card-text">{text}</p>
        <span className="card-list__card-source">{source}</span>
      </div>
    </li>
  );
}

SavedNewsCard.propTypes = {
  keyword: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.date.isRequired,
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default SavedNewsCard;
