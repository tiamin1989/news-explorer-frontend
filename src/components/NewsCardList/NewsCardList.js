import React from 'react';
import PropTypes from 'prop-types';
import NewsCard from '../NewsCard/NewsCard';

import './NewsCardList.css';

function NewsCardList({
  loggedIn,
  cards,
  keyword,
}) {
  const [cardIndex, setCardIndex] = React.useState(0);
  const [cardList, setCardList] = React.useState([]);

  function showMore() {
    const nextCards = cards.slice(cardIndex, cardIndex + 3);
    setCardList([...cardList, ...nextCards]);
    setCardIndex(cardIndex + 3);
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
            isAdded={true}
            keyword={keyword}
            description={item.description}
            publishedAt={item.publishedAt}
            source={item.source.name}
            title={item.title}
            url={item.url}
            urlToImage={item.urlToImage}
          />))}
        </ul>
        {(cards.length - cardIndex) > 0 ? (<button onClick={showMore} className="card-list__more">Показать еще</button>) : ''}
      </section>
    );
  } return (null);
}

NewsCardList.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  cards: PropTypes.array,
  keyword: PropTypes.string.isRequire,
};

export default NewsCardList;
