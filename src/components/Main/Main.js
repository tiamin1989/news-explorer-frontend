import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SavedNews from '../SavedNews/SavedNews';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

import './Main.css';

function Main({
  loggedIn,
  isLoading,
  cards,
}) {
  const location = useLocation();

  return (
    <main className="main">
      {location.pathname === '/saved-news' ? <SavedNews loggedIn={loggedIn} /> : ''}
      {isLoading
        ? <Preloader isLoading={isLoading} />
        : <NewsCardList
          loggedIn={loggedIn}
          cards={cards}
          searchPage={true}
        />}
    </main>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  cards: PropTypes.array,
};

export default Main;
