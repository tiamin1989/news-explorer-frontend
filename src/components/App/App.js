import React, { useState /* useEffect */ } from 'react';
import { /* Route, Switch, */ withRouter /* Redirect, useHistory */ } from 'react-router-dom';
import Footer from '../Footer/Footer';
/* import About from '../About/About.js';
import Footer from '../Footer/Footer.js'; */
import Header from '../Header/Header';
/* import Main from '../Main/Main.js';
import Navigation from '../Navigation/Navigation.js';
import NewsCard from '../NewsCard/NewsCard.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Preloader from '../Preloader/Preloader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SearchForm from '../SearchForm/SearchForm.js';
 */
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleOnClick() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      /* setCurrentUser(userContext); */
      setLoggedIn(false);
    }
  }

  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
        onClick={handleOnClick}
      />
      <Footer
      />
    </div>
  );
}

export default withRouter(App);
