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
  const [needDisplayCount, setNeedDisplayCount] = React.useState(3);

  function showMore() {
    setNeedDisplayCount(needDisplayCount + 3);
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

  let currentCardList = [];
  if (location.pathname === '/' && cards) {
    currentCardList = cards.slice(0, needDisplayCount);
  } else {
    currentCardList = savedCards;
  }

  if (currentCardList.length) {
    return (
      <section className="card-list">
        {
          location.pathname === '/'
            ? (<h2 className="card-list__title">Результаты поиска</h2>)
            : ''
        }
        <ul className="card-list__news-cards">
          {currentCardList.map((item, index) => {
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
        {location.pathname === '/' && (currentCardList.length !== cards.length)
          ? (<button onClick={showMore} className="card-list__more">Показать еще</button>)
          : ''
        }
      </section>
    );
  }
  if (!currentCardList.length && isSearching && loggedIn) {
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
