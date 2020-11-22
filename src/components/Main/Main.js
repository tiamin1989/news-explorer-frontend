import React from 'react';
import PropTypes from 'prop-types';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

import './Main.css';

function Main({ isLoading }) {
  const img = '../../images/card-def-image.png';

  return (
    <main className="main">
      <SavedNewsHeader />
      {isLoading ? <NewsCardList
        img={img}
      /> : <Preloader
          isLoading={isLoading} />}
      <About />
    </main>
  );
}

Main.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Main;
