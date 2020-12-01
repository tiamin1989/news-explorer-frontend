import React from 'react';
import {
  withRouter,
  useHistory,
  Switch,
  Route,
} from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import About from '../About/About';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import MessagePopup from '../MessagePopup/MessagePopup';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { connectNewsApi, connectMainApi } from '../../utils/utils';

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = React.useState(false);

  const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
  const [isMessagePopupOpen, setMessagePopupOpen] = React.useState(false);

  const [messagePopupName, setMessagePopupName] = React.useState('');
  const [messagePopupTitle, setMessagePopupTitle] = React.useState('');
  const [messagePopupContent, setMessagePopupContent] = React.useState('');

  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);

  const history = useHistory();

  function closeAllPopups() {
    setRegisterPopupOpen(false);
    setMessagePopupOpen(false);
    setLoginPopupOpen(false);
  }

  function handleOnClick() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      setCurrentUser({});
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

  function handleMessagePopupClose() {
    setMessagePopupOpen(false);
  }

  function handleLoginPopupSubmit({ email, password }) {
    connectMainApi.login({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setCurrentUser(res);
      })
      .catch(() => {

      });
    setLoginPopupOpen(false);
  }

  function handleRegisterClick() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(true);
  }

  function handleLoginClick() {
    closeAllPopups();
    setLoginPopupOpen(true);
  }

  function onUnLoginClick() {
    history.push('./');
    localStorage.removeItem('jwt');
    setCurrentUser({});
  }

  function showMessage({ name, title, content }) {
    closeAllPopups();
    setMessagePopupName(name);
    setMessagePopupTitle(title);
    setMessagePopupContent(content);
    setMessagePopupOpen(true);
  }

  function handleSearchSubmit(query) {
    setIsSearching(true);
    setIsLoading(true);
    connectNewsApi.getNews(query)
      .then((res) => {
        setCards(res.articles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsSearching(false);
        setIsLoading(false);
        showMessage({
          name: 'failure',
          title: 'Произошла ошибка',
          content: (<span className="popup__offer popup__offer_left">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </span>),
        });
      });
  }

  function handleRegisterPopupSubmit({ name, email, password }) {
    connectMainApi.register({
      name,
      email,
      password,
    })
      .then(() => {
        showMessage({
          name: 'success',
          title: 'Пользователь успешно зарегистрирован!',
          content: (<span className="popup__offer popup__offer_left">
            <a className="popup__offer-link" href="#" onClick={handleLoginClick}>Войти</a>
          </span>),
        });
      })
      .catch(() => {

      });
  }

  function setSavedCardsF() {
    setSavedCards([]);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      connectMainApi.authorize({ jwt })
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(() => {
          showMessage({
            name: 'failure',
            title: 'Не удалось войти в учетную запись',
            content: (<span className="popup__offer popup__offer_left">
              К сожалению не удалось подключиться. Попробуйте войти снова
            </span>),
          });
        });
    }
  }, []);

  React.useEffect(() => {
    if (Object.keys(currentUser).length !== 0) setLoggedIn(true);
    else setLoggedIn(false);
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header
        loggedIn={loggedIn}
        onHamburgerClick={handleHamburgerClick}
        isHamburgerActive={isHamburgerActive}
        onCloseClick={handleCloseClick}
        onLoginClick={handleLoginClick}
        onUnLoginClick={onUnLoginClick}
        onSearchSubmit={handleSearchSubmit}
        onError={showMessage}
      />

      <Switch>

        <ProtectedRoute
          exact path='/saved-news'
          isSearching={isSearching}
          loggedIn={loggedIn}
          isLoading={isLoading}
          savedCards={savedCards}
          component={Main}
          f={setSavedCardsF}
        />

        <Route path='/'>
          {isSearching
            ? (<Main
              isLoading={isLoading}
              loggedIn={loggedIn}
              cards={cards}
            />)
            : ''}
          <About />
        </Route>

      </Switch>

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
        onRegister={handleRegisterPopupSubmit}
        onLoginClick={handleLoginClick}
      />
      <MessagePopup
        isOpen={isMessagePopupOpen}
        onClose={handleMessagePopupClose}
        onLoginClick={handleLoginClick}
        name={messagePopupName}
        title={messagePopupTitle}
        content={messagePopupContent}
      />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
