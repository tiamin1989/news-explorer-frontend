import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList() {
  return (
    <section className="card-list">
      <h2 className="card-list__title">Результаты поиска</h2>
      <ul className="card-list__news-cards">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </ul>
      <button className="card-list__more">Показать еще</button>
    </section>
  );
}

export default NewsCardList;
