import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({
  loggedIn,
  cards,
  savedCards,
  onSaveCard,
}) {
  const [cardIndex, setCardIndex] = React.useState(0);
  const [cardList, setCardList] = React.useState([]);

  function showMore() {
    const nextCards = cards.slice(cardIndex, cardIndex + 3);
    setCardList([...cardList, ...nextCards]);
    setCardIndex(cardIndex + 3);
  }

  function checkIsAdded(url) {
    return !!savedCards.find((card) => card.link === url);
  }

  React.useEffect(() => {
    setCardList(cards ? cards.slice(cardIndex, cardIndex + 3) : []);
    setCardIndex(cardIndex + 3);
  }, []);

  if (cardList.length) {
    return (
      <section className="card-list">
        <h2 className="card-list__title">Результаты поиска</h2>
        <ul className="card-list__news-cards">
          {cardList.map((item, index) => (<NewsCard
            key={index}
            isLoggedIn={loggedIn}
            isAdded={checkIsAdded(item.link)}
            onSaveCard={onSaveCard}
            keyword={item.keyword}
            text={item.text}
            date={item.date}
            source={item.source}
            title={item.title}
            link={item.link}
            image={item.image}
          />))}
        </ul>
        {(cards.length - cardIndex) > 0 ? (<button onClick={showMore} className="card-list__more">Показать еще</button>) : ''}
      </section>
    );
  } return (null);
}

NewsCardList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  cards: PropTypes.array.isRequired,
  savedCards: PropTypes.array.isRequired,
  onSaveCard: PropTypes.func.isRequired,
};

export default NewsCardList;
