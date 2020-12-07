import React from 'react';
import PropTypes from 'prop-types';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews({
  savedCards,
  keywords,
}) {
  return (
    <>
      <SavedNewsHeader savedCards={savedCards} keywords={keywords} />
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
