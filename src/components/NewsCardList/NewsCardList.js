import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({ loggedIn, cards, searchPage }) {
  const [cardIndex, setCardIndex] = React.useState(0);
  const [cardList, setCardList] = React.useState([]);
  const location = useLocation();

  function addCardsToList() {
    const copy = JSON.parse(JSON.stringify(cardList));
    copy.push(cards[cardIndex]);
    copy.push(cards[cardIndex + 1]);
    copy.push(cards[cardIndex + 2]);
    setCardIndex(cardIndex + 3);
    return copy;
  }

  function showMore() {
    setCardList(addCardsToList());
  }

  React.useEffect(() => {
    setCardList(cards.slice(cardIndex, cardIndex + 3));
    setCardIndex(cardIndex + 3);
  }, []);

  return (
    <section className="card-list">
      {location.pathname !== '/saved-news' ? (<h2 className="card-list__title">Результаты поиска</h2>) : ''}
      <ul className="card-list__news-cards">
        {cardList.map((item, index) => (<NewsCard
          key={index}
          isLoggedIn={loggedIn}
          cardCategory={'Рубрика'}
          isAdded={true}
          description={item.description}
          publishedAt={item.publishedAt}
          source={item.source}
          title={item.title}
          url={item.url}
          urlToImage={item.urlToImage}
          searchPage={searchPage}
        />))}
      </ul>
      {location.pathname !== '/saved-news' && cards.length > 3 && (cards.length - cardIndex) > 0 ? (<button onClick={showMore} className="card-list__more">Показать еще</button>) : ''}
    </section>
  );
}

NewsCardList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  cards: PropTypes.array.isRequired,
  searchPage: PropTypes.bool.isRequired,
};

export default NewsCardList;
