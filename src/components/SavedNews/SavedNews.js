import React from 'react';
import PropTypes from 'prop-types';
import SavedNewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({ loggedIn, cards }) {
  return (
    <>
      <SavedNewsHeader cards={cards} />
      <SavedNewsCardList
        loggedIn={loggedIn}
        cards={cards}
      />
    </>
  );
}

SavedNews.propTypes = {
  loggedIn: PropTypes.bool,
  cards: PropTypes.array,
};

export default SavedNews;
