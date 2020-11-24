import React from 'react';
import { /* Route, Switch, */ withRouter /* Redirect, useHistory */ } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import SuccessMessagePopup from '../SuccessMessagePopup/SuccessMessagePopup';
/*
import Navigation from '../Navigation/Navigation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import SavedNews from '../SavedNews/SavedNews';
 */
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);

  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isSuccessMessagePopupOpen, setSuccessMessagePopupOpen] = React.useState(true);

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

  function handleLoginPopupClose() {
    setLoginPopupOpen(false);
  }

  function handleRegisterPopupClose() {
    setRegisterPopupOpen(false);
  }

  function handleSuccessMessagePopupClose() {
    setSuccessMessagePopupOpen(false);
  }

  function handleLoginPopupSubmit() {
    setLoginPopupOpen(false);
  }

  function handleRegisterClick() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(true);
  }

  function handleLoginClick() {
    setRegisterPopupOpen(false);
    setSuccessMessagePopupOpen(false);
    setLoginPopupOpen(true);
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
        onLoginClick={handleLoginClick}
      />
      <Main
        isLoading={isLoading}
      />
      <Footer />

      <LoginPopup
        isOpen={isLoginPopupOpen}
        onClose={handleLoginPopupClose}
        onLogin={handleLoginPopupSubmit}
        onRegisterClick={handleRegisterClick}
      />
      <RegisterPopup
        isOpen={isRegisterPopupOpen}
        onClose={handleRegisterPopupClose}
        onLoginClick={handleLoginClick}
      />
      <SuccessMessagePopup
        isOpen={isSuccessMessagePopupOpen}
        onClose={handleSuccessMessagePopupClose}
        onLoginClick={handleLoginClick}
      />
    </>
  );
}

export default withRouter(App);
