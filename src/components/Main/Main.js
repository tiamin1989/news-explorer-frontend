import React from 'react';
import {
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SavedNews from '../SavedNews/SavedNews';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main({
  loggedIn,
  isLoading,
  savedCards,
  cards,
  keyword,
}) {
  return (
    <main className="main">
      <Route path='/saved-news'>
        <SavedNews loggedIn={loggedIn} cards={savedCards} />
      </Route>
      <Route path='/'>
        {
          isLoading
            ? <Preloader isLoading={isLoading} />
            : <NewsCardList loggedIn={loggedIn} cards={cards} keyword={keyword} />
        }
      </Route>
    </main>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cards: PropTypes.array,
  savedCards: PropTypes.array,
  keyword: PropTypes.string.isRequire,
};

export default Main;
