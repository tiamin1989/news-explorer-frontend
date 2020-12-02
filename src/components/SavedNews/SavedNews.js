import React from 'react';
import PropTypes from 'prop-types';
import SavedNewsCardList from '../SavedNewsCardList/SavedNewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({ loggedIn, savedCards }) {
  return (
    <>
      <SavedNewsHeader savedCards={savedCards} />
      <SavedNewsCardList
        loggedIn={loggedIn}
        savedCards={savedCards}
      />
    </>
  );
}

SavedNews.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  savedCards: PropTypes.array,
};

export default SavedNews;
