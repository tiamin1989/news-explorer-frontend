import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import About from '../About/About';
import SavedNews from '../SavedNews/SavedNews';
import NewsCardList from '../NewsCardList/NewsCardList';

import './Main.css';

function Main({ loggedIn }) {
  const location = useLocation();
  return (
    <main className="main">
      {location.pathname === '/saved-news' ? <SavedNews
        isLoggedIn={true}
      /> : <NewsCardList
          loggedIn={loggedIn}
        />}
      <About />
    </main>
  );
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

export default Main;
