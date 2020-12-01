import React from 'react';
import PropTypes from 'prop-types';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({ loggedIn, cards }) {
  return (
    <>
      <SavedNewsHeader />
      <NewsCardList
        loggedIn={loggedIn}
        cards={cards}
        searchPage={false}
      />
    </>
  );
}

SavedNews.propTypes = {
  loggedIn: PropTypes.bool,
  cards: PropTypes.array,
};

export default SavedNews;
