import React from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './SavedNewsHeader.css';

function SavedNewsHeader({ savedCards }) {
  const currentUser = React.useContext(CurrentUserContext);

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
        По ключевым словам: <span className="saved-news__tags-bold">Природа</span>
        , <span className="saved-news__tags-bold">Тайга</span> и 2-м другим
      </p>
    </section>
  );
}

SavedNewsHeader.propTypes = {
  savedCards: PropTypes.array.isRequired,
};

export default SavedNewsHeader;
