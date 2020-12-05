import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({
  loggedIn,
  cards,
  savedCards,
  onSaveCard,
  onDeleteCard,
}) {
  const [cardIndex, setCardIndex] = React.useState(0);
  const [cardList, setCardList] = React.useState([]);

  function showMore() {
    const nextCards = cards.slice(cardIndex, cardIndex + 3);
    setCardList([...cardList, ...nextCards]);
    setCardIndex(cardIndex + 3);
  }

  function checkIsAdded(link) {
    const foundedCard = savedCards.find((card) => card.link === link);
    return {
      _id: foundedCard ? foundedCard._id : '',
      isAdded: !!foundedCard,
    };
  }

  function truncString(max, str) {
    return str.length > max ? `${str.slice(0, max - 3)}...` : str;
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
            onDeleteCard={onDeleteCard}
            checkIsAdded={checkIsAdded}
            keyword={truncString(30, item.keyword)}
            text={item.text.replace(/<[^>]+>/g, '')}
            date={item.date}
            source={item.source}
            title={truncString(70, item.title)}
            link={item.link}
            image={item.image}
          />))}
        </ul>
        {cards.length - cardIndex > 0 ? (<button onClick={showMore} className="card-list__more">Показать еще</button>) : ''}
      </section>
    );
  } return (null);
}

NewsCardList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  cards: PropTypes.array,
  savedCards: PropTypes.array,
  onSaveCard: PropTypes.func,
  onDeleteCard: PropTypes.func.isRequired,
};

export default NewsCardList;
