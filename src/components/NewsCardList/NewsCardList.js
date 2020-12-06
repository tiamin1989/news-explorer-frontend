import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsCard from '../SavedNewsCard/SavedNewsCard';

import Preloader from '../Preloader/Preloader';

import './NewsCardList.css';

function NewsCardList({
  loggedIn,
  cards,
  savedCards,
  onSaveCard,
  onDeleteCard,
  showOffer,
  isSearching,
}) {
  const location = useLocation();
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
    if (location.pathname === '/') {
      setCardList(cards ? cards.slice(cardIndex, cardIndex + 3) : []);
      setCardIndex(cardIndex + 3);
    } else {
      setCardList(savedCards);
      setCardIndex(savedCards.length - 1);
    }
  }, []);

  React.useEffect(() => {
    if (location.pathname === '/' && cards) {
      setCardList(cards ? cards.slice(cardIndex, cardIndex + 3) : []);
      setCardIndex(cardIndex + 3);
    }
  }, [cards]);

  if (cardList.length) {
    return (
      <section className="card-list">
        {
          location.pathname === '/'
            ? (<h2 className="card-list__title">Результаты поиска</h2>)
            : ''
        }
        <ul className="card-list__news-cards">
          {cardList.map((item, index) => {
            if (location.pathname === '/') {
              return (<NewsCard
                key={index}
                isLoggedIn={loggedIn}
                isAdded={checkIsAdded(item.link)}
                onSaveCard={onSaveCard}
                onDeleteCard={onDeleteCard}
                checkIsAdded={checkIsAdded}
                showOffer={showOffer}
                keyword={truncString(30, item.keyword)}
                text={item.text.replace(/<[^>]+>/g, '')}
                date={item.date}
                source={item.source}
                title={truncString(70, item.title)}
                link={item.link}
                image={item.image}
              />);
            }
            return (<SavedNewsCard
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
            />);
          })}
        </ul>
        {location.pathname === '/' && (cards.length - cardIndex > 0)
          ? (<button onClick={showMore} className="card-list__more">Показать еще</button>)
          : ''
        }
      </section>
    );
  }
  if (!cardList.length && !isSearching) {
    return (<Preloader />);
  }
  return (null);
}

NewsCardList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  cards: PropTypes.array,
  savedCards: PropTypes.array,
  onSaveCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  showOffer: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
};

export default NewsCardList;
