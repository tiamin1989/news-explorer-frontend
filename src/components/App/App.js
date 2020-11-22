import React from 'react';
import { /* Route, Switch, */ withRouter /* Redirect, useHistory */ } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
/*
import Navigation from '../Navigation/Navigation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import SavedNews from '../SavedNews/SavedNews';
 */
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);

  function handleOnClick() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      /* setCurrentUser(userContext); */
      setLoggedIn(false);
    }
  }

  function handleHamburgerClick() {
    handleOnClick();
    setIsHamburgerActive(true);
  }

  function handleCloseClick() {
    setIsHamburgerActive(false);
    setIsLoading(true);
  }

  React.useEffect(() => {
    console.log('привет');
  }, []);

  return (
    <>
      <Header
        loggedIn={loggedIn}
        onHamburgerClick={handleHamburgerClick}
        isHamburgerActive={isHamburgerActive}
        onCloseClick={handleCloseClick}
      />
      <Main
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
}

export default withRouter(App);
