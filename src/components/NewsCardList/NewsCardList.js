import React from 'react';
import { useLocation } from 'react-router-dom';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList() {
  const location = useLocation();

  return (
    <section className="card-list">
      {location.pathname !== '/saved-news' ? (<h2 className="card-list__title">Результаты поиска</h2>) : ''}
      <ul className="card-list__news-cards">
        <NewsCard
          isLoggedIn={true}
          cardCategory='Рубрика'
          isAdded={true}
        />
        <NewsCard
          isLoggedIn={true}
          cardCategory='Рубрика2'
          isAdded={false}
        />
        <NewsCard
          isLoggedIn={true}
          cardCategory='Рубрика2'
          isAdded={false}
        />
      </ul>
      {location.pathname !== '/saved-news' ? (<button className="card-list__more">Показать еще</button>) : ''}
    </section>
  );
}

export default NewsCardList;
