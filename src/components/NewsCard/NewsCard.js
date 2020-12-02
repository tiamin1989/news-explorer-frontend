import React from 'react';
import './NewsCard.css';
import PropTypes from 'prop-types';

import noPhoto from '../../images/no-photo-available.png';

function NewsCard({
  isLoggedIn,
  isAdded,
  keyword,
  description,
  publishedAt,
  source,
  title,
  url,
  urlToImage,
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
    console.log(keyword);
  }

  function onCardClick() {
    window.open(url, '_blank');

    /* удалить потом */
    saveCard();
  }

  return (
    <li className="card-list__news-card" onClick={onCardClick}>
      <img src={urlToImage !== null ? urlToImage : noPhoto} alt="Изображение новости" className="card-list__card-image" />
      {
        isLoggedIn ? (
          <>
            <button className={`card-list__card-added${isAdded ? ' card-list__card-added_added' : ''}`} onMouseEnter={showMessage} onMouseLeave={hideMessage} />
            <span ref={message} className="card-list__card-message card-list__card-message_big">Убрать из сохранённых</span>
          </>
        ) : (
            <>
              <button className="card-list__card-added" onMouseEnter={showMessage} onMouseLeave={hideMessage} />
              <span ref={message} className="card-list__card-message">Войдите, чтобы сохранять статьи</span>
            </>
        )
      }
      <div className="card-list__wrapper">
        <span className="card-list__card-date">{publishedAt}</span>
        <h2 className="card-list__card-title">{title}</h2>
        <p className="card-list__card-text">{description}</p>
        <span className="card-list__card-source">{source}</span>
      </div>
    </li>
  );
}

NewsCard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool.isRequired,
  keyword: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urlToImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NewsCard;
