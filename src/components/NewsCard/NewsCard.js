import React from 'react';
import './NewsCard.css';
import PropTypes from 'prop-types';

import noPhoto from '../../images/no-photo-available.png';

function NewsCard({
  isLoggedIn,
  isAdded,
  onSaveCard,
  onDeleteCard,
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

  function saveCard() {
    onSaveCard({
      date,
      keyword,
      title,
      text,
      source,
      link,
      image,
    });
  }

  function deleteCard() {
    onDeleteCard(isAdded._id);
  }

  function onCardClick() {
    window.open(link, '_blank');
  }

  function showDate(dateToFormat) {
    const months = {
      1: 'января',
      2: 'февраля',
      3: 'марта',
      4: 'апреля',
      5: 'мая',
      6: 'июня',
      7: 'июля',
      8: 'августа',
      9: 'сентября',
      10: 'октября',
      11: 'ноября',
      12: 'декабря',
    };
    const extracted = dateToFormat.replace(/T\d{2}:\d{2}:\d{2}Z/, '').split('-');
    return `${extracted[2]} ${months[extracted[1]]}, ${extracted[0]}`;
  }

  return (
    <li className="card-list__news-card">
      <img src={image !== null ? image : noPhoto} alt="Изображение новости" className="card-list__card-image" onClick={onCardClick} />
      {
        isLoggedIn ? (
          <>
            <button className={`card-list__card-added${isAdded.isAdded ? ' card-list__card-added_added' : ''}`} onMouseEnter={showMessage} onMouseLeave={hideMessage} onClick={isAdded.isAdded ? deleteCard : saveCard} />
            <span ref={message} className="card-list__card-message card-list__card-message_big">{isAdded.isAdded ? 'Убрать из сохранённых' : 'Сохранить'}</span>
          </>
        ) : (
            <>
              <button className="card-list__card-added" onMouseEnter={showMessage} onMouseLeave={hideMessage} />
              <span ref={message} className="card-list__card-message">Войдите, чтобы сохранять статьи</span>
            </>
        )
      }
      <div className="card-list__wrapper" onClick={onCardClick}>
        <span className="card-list__card-date">{showDate(date)}</span>
        <h2 className="card-list__card-title">{title}</h2>
        <p className="card-list__card-text">{text}</p>
        <span className="card-list__card-source">{source}</span>
      </div>
    </li>
  );
}

NewsCard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdded: PropTypes.object.isRequired,
  onSaveCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NewsCard;
