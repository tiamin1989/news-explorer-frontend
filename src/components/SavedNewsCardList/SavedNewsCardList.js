import React from 'react';
import PropTypes from 'prop-types';
import SavedNewsCard from '../SavedNewsCard/SavedNewsCard';

import './SavedNewsCardList.css';

function SavedNewsCardList({
  savedCards,
}) {
  function checkIsAdded(link) {
    const foundedCard = savedCards.find((card) => card.link === link);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    return {
      id: foundedCard ? foundedCard._id : '',
      isAdded: !!foundedCard,
    };
  }

  return (
    <section className="card-list">
      <ul className="card-list__news-cards">
        {savedCards.map((item, index) => (<SavedNewsCard
          key={index}
          isAdded={checkIsAdded(item.link)}
          keyword={item.keyword}
          text={item.text}
          date={item.date}
          source={item.source}
          title={item.title}
          link={item.link}
          image={item.image}
          /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
          id={item.id}
        />))}
      </ul>
    </section>
  );
}

SavedNewsCardList.propTypes = {
  savedCards: PropTypes.array.isRequired,
};

export default SavedNewsCardList;
