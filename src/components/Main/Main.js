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
  showOffer,
  isSearching,
}) {
  function getKeywordsQuantityObj() {
    /* eslint-disable */
    const keywordsCount = {};
    let max = [0, ''];
    let maxSecond = [0, ''];
    let savedCardToEdit = JSON.parse(JSON.stringify(savedCards));

    function getMaxValues(cards, max) {
      cards.forEach((obj) => {
        if (!keywordsCount.hasOwnProperty(obj.keyword)) {
          keywordsCount[obj.keyword] = 1;
        } else {
          keywordsCount[obj.keyword] += 1;
        }
        /* получаем максимальное число совпадений и этот повторяемый ключ */
        if (max[0] < keywordsCount[obj.keyword]) {
          max[0] = keywordsCount[obj.keyword];
          max[1] = obj.keyword;
        }
      });
    }
    getMaxValues(savedCards, max);

    /* убираем его из объекта keywordsCount */
    savedCardToEdit = savedCardToEdit.filter((obj) => obj.keyword !== max[1]);

    getMaxValues(savedCardToEdit, maxSecond);

    return {
      keywords: keywordsCount,
      max,
      maxSecond,
    };
  }

  const keywordsQuantityObj = getKeywordsQuantityObj();

  return (
    <main className="main">
      <Route path='/saved-news'>
        <SavedNews
          loggedIn={loggedIn}
          savedCards={savedCards}
          keywords={keywordsQuantityObj}
          onSaveCard={onSaveCard}
          onDeleteCard={onDeleteCard}
        />
      </Route>
      <Route path='/'>
        {
          isLoading
            ? <Preloader isLoading={isLoading} />
            : <NewsCardList
              loggedIn={loggedIn}
              showOffer={showOffer}
              cards={cards}
              savedCards={savedCards}
              onSaveCard={onSaveCard}
              onDeleteCard={onDeleteCard}
              isSearching={isSearching} />
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
  onSaveCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
  showOffer: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
};

export default Main;
