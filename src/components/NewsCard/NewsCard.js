import React from 'react';
import './NewsCard.css';
import PropTypes from 'prop-types';

function NewsCard({
  isLoggedIn,
  isAdded,
  cardCategory,
  urlToImage,
  /* url, */
  title,
  /*   source, */
  publishedAt,
  description,
  searchPage,
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

  return (
    <li className="card-list__news-card">
      {
        !searchPage ? (
          <>
            <span className="card-list__card-category">{cardCategory}</span>
          </>
        ) : ''
      }
      <img src={urlToImage} alt="Изображение новости" className="card-list__card-image" />
      {
        isLoggedIn ? (
          <>
            {searchPage
              ? <button className={`card-list__card-added${isAdded ? ' card-list__card-added_added' : ''}`} onMouseEnter={showMessage} onMouseLeave={hideMessage} />
              : <button className={`card-list__card-added${isAdded ? ' card-list__card-added_delete' : ''}`} onMouseEnter={showMessage} onMouseLeave={hideMessage} />
            }
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
        <span className="card-list__card-source">{/* source.name */}</span>
      </div>
    </li>
  );
}

NewsCard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool,
  cardCategory: PropTypes.string,
  /* url: PropTypes.url, */
  urlToImage: PropTypes.string,
  title: PropTypes.string,
  source: PropTypes.object,
  publishedAt: PropTypes.string,
  description: PropTypes.string,
  searchPage: PropTypes.bool.isRequired,
};

export default NewsCard;
