import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ loggedIn }) {
  const location = useLocation();

  return (
    <section className="card-list">
      {location.pathname !== '/saved-news' ? (<h2 className="card-list__title">Результаты поиска</h2>) : ''}
      <ul className="card-list__news-cards">
        <NewsCard
          isLoggedIn={loggedIn}
          cardCategory={loggedIn ? 'Рубрика' : ''}
          isAdded={loggedIn}
        />
        <NewsCard
          isLoggedIn={loggedIn}
          cardCategory={loggedIn ? 'Рубрика' : ''}
          isAdded={loggedIn}
        />
        <NewsCard
          isLoggedIn={loggedIn}
          cardCategory={loggedIn ? 'Рубрика' : ''}
          isAdded={loggedIn}
        />
      </ul>
      {location.pathname !== '/saved-news' ? (<button className="card-list__more">Показать еще</button>) : ''}
    </section>
  );
}

NewsCardList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default NewsCardList;
