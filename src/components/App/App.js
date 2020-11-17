import React, { useState /* useEffect */ } from 'react';
import { /* Route, Switch, */ withRouter /* Redirect, useHistory */ } from 'react-router-dom';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
/* import NewsCard from '../NewsCard/NewsCard.js'; */
import NewsCardList from '../NewsCardList/NewsCardList';
/* import Main from '../Main/Main.js';
import Navigation from '../Navigation/Navigation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Preloader from '../Preloader/Preloader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
 */
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const img = '../../images/card-def-image.png';
  function handleOnClick() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      /* setCurrentUser(userContext); */
      setLoggedIn(false);
    }
  }

  return (
    <>
      <Header
        loggedIn={loggedIn}
        onClick={handleOnClick}
      />
      <NewsCardList
        img={img}
      />
      <About />
      <Footer />
    </>
  );
}

export default withRouter(App);
