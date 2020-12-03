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
  onSaveCard,
  onDeleteCard,
}) {
  return (
    <main className="main">
      <Route path='/saved-news'>
        <SavedNews loggedIn={loggedIn} savedCards={savedCards} />
      </Route>
      <Route path='/'>
        {
          isLoading
            ? <Preloader isLoading={isLoading} />
            : <NewsCardList
              loggedIn={loggedIn}
              cards={cards}
              savedCards={savedCards}
              onSaveCard={onSaveCard}
              onDeleteCard={onDeleteCard} />
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
  onSaveCard: PropTypes.func,
  onDeleteCard: PropTypes.func,
};

export default Main;
