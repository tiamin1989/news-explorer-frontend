import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import About from '../About/About';
import SavedNews from '../SavedNews/SavedNews';
import NewsCardList from '../NewsCardList/NewsCardList';

import './Main.css';

function Main({ isLoading }) {
  const location = useLocation();
  return (
    <main className="main">
      {location.pathname === '/saved-news' ? <SavedNews
        isLoading={isLoading}
      /> : <NewsCardList />}
      <About />
    </main>
  );
}

Main.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Main;
