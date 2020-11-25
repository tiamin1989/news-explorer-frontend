import React from 'react';
import './NewsCard.css';
import PropTypes from 'prop-types';
import img from '../../images/card-def-image.png';

function NewsCard({ isLoggedIn, isAdded, cardCategory }) {
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
        cardCategory ? (
          <>
            <span className="card-list__card-category">{cardCategory}</span>
          </>
        ) : ''
      }
      <img src={img} alt="Изображение новости" className="card-list__card-image" />
      {
        isLoggedIn ? (
          <>
            <button className={`card-list__card-added${isAdded ? ' card-list__card-added_active' : ''}`} />
          </>
        ) : (
            <>
              <button className="card-list__card-added" onMouseEnter={showMessage} onMouseLeave={hideMessage} />
              <span ref={message} className="card-list__card-message">Войдите, чтобы сохранять статьи</span>
            </>
        )
      }
      <div className="card-list__wrapper">
        <span className="card-list__card-date">2 августа, 2019</span>
        <h2 className="card-list__card-title">Национальное достояние – парки</h2>
        <p className="card-list__card-text">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
        <span className="card-list__card-source">Лента.ру</span>
      </div>
    </li>
  );
}

NewsCard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool,
  cardCategory: PropTypes.string,
};

export default NewsCard;
