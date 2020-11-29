import React from 'react';
import PropTypes from 'prop-types';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({ loggedIn }) {
  return (
    <>
      <SavedNewsHeader />
      <NewsCardList
        loggedIn={loggedIn}
      />
    </>
  );
}

SavedNews.propTypes = {
  loggedIn: PropTypes.bool,
};

export default SavedNews;
