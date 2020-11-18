import React from 'react';
import './NewsCard.css';
import PropTypes from 'prop-types';
import img from '../../images/card-def-image.png';

function NewsCard() {
  return (
    <li className="card-list__news-card">
      <img src={img} className="card-list__card-image" />
      <span className="card-list__card-added card-list__card-added_true"></span>
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
  img: PropTypes.bool.isRequired,
};

export default NewsCard;
