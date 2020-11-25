import React from 'react';
import PropTypes from 'prop-types';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './SavedNews.css';

function SavedNews({ isLoading }) {
  const img = '../../images/card-def-image.png';

  return (
    <>
      <SavedNewsHeader />
      {!isLoading ? <NewsCardList
        img={img}
      /> : <Preloader
          isLoading={isLoading} />}
    </>
  );
}

SavedNews.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default SavedNews;
