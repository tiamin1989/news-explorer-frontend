import React from 'react';
import PropTypes from 'prop-types';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({
  loggedIn,
  savedCards,
  keywords,
  onSaveCard,
  onDeleteCard,
}) {
  return (
    <>
      <SavedNewsHeader savedCards={savedCards} keywords={keywords} />
      <NewsCardList
        loggedIn={loggedIn}
        savedCards={savedCards}
        onSaveCard={onSaveCard}
        onDeleteCard={onDeleteCard} />
    </>
  );
}

SavedNews.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  savedCards: PropTypes.array,
  keywords: PropTypes.object,
  onSaveCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func,
};

export default SavedNews;
