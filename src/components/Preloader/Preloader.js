import React from 'react';
import PropTypes from 'prop-types';
import notFound from '../../images/not-found.svg';

import './Preloader.css';

function Preloader({ isLoading }) {
  return (
    <section className="loader">
      {isLoading
        ? (
          <div className="loader__wrapper">
            <i className="loader__circle-preloader"></i>
            <h2 className="loader__title">Идет поиск новостей...</h2>
          </div>
        ) : (
          <div className="loader__not-found">
            <img src={notFound} alt="Не найдено" className="loader__not-found-image" />
            <h2 className="loader__title loader__title_not-found">Ничего не найдено</h2>
            <p className="loader__description">К сожалению по вашему запросу ничего не найдено.</p>
          </div>
        )}
    </section>
  );
}

Preloader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Preloader;
