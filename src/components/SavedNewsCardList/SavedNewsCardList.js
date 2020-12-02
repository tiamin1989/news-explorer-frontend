import React from 'react';
import PropTypes from 'prop-types';
import SavedNewsCard from '../SavedNewsCard/SavedNewsCard';

import './SavedNewsCardList.css';

function SavedNewsCardList({
  savedCards,
}) {
  return (
    <section className="card-list">
      <ul className="card-list__news-cards">
        {savedCards.map((item, index) => (<SavedNewsCard
          key={index}
          keyword={item.keyword}
          text={item.text}
          date={item.date}
          source={item.source}
          title={item.title}
          link={item.link}
          image={item.image}
        />))}
      </ul>
    </section>
  );
}

SavedNewsCardList.propTypes = {
  savedCards: PropTypes.array.isRequired,
};

export default SavedNewsCardList;
