import React from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './SavedNewsHeader.css';

function SavedNewsHeader({ savedCards, keywords }) {
  const currentUser = React.useContext(CurrentUserContext);
  const anotherCount = keywords.length - keywords.maxSecond[0] !== 0 ? 2 : 1;

  function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20)
      ? 2
      : [2, 0, 1, 1, 1, 2][(number % 10 < 5)
        ? number % 10
        : 5]];
  }

  return (
    <section className="saved-news">
      <h1 className="saved-news__title">Сохранённые статьи</h1>
      <p className="saved-news__message">{
        `${currentUser.name}, у вас ${savedCards.length} ${declOfNum(savedCards.length, ['сохранённая статья', 'сохранённые статьи', 'сохранённых статей'])}`}</p>
      <p className="saved-news__tags">
        По ключевым словам: <span className="saved-news__tags-bold">{keywords.max[1]}</span>
        {
          keywords.maxSecond[0] !== 0
            ? (<>
              <span>, </span>
              <span className="saved-news__tags-bold">{keywords.maxSecond[1]} </span>
            </>)
            : ' '
        }
        {
          anotherCount
            ? `${anotherCount}-м другим`
            : ''
        }

      </p>
    </section>
  );
}

SavedNewsHeader.propTypes = {
  savedCards: PropTypes.array.isRequired,
  keywords: PropTypes.object,
};

export default SavedNewsHeader;
