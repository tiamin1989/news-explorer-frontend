import React, { useState /* useEffect */ } from 'react';
import { /* Route, Switch, */ withRouter /* Redirect, useHistory */ } from 'react-router-dom';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
/* import Main from '../Main/Main.js';
import Navigation from '../Navigation/Navigation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

import SavedNews from '../SavedNews/SavedNews.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';

 */
import './App.css';

const img = '../../images/card-def-image.png';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleOnClick() {
    if (loggedIn) {
      /* localStorage.removeItem('jwt'); */
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
            <About />
            <Footer />
      <Preloader />
      <NewsCardList
        img={img}
      />

    </>
  );
}

export default withRouter(App);
