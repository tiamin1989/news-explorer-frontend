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

  function showMessage({ name, title, content }) {
    closeAllPopups();
    setMessagePopupName(name);
    setMessagePopupTitle(title);
    setMessagePopupContent(content);
    setMessagePopupOpen(true);
  }

  function handleLoginPopupSubmit({ email, password }) {
    connectMainApi.login({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        connectMainApi.authorize({ jwt: res.token })
          .then((user) => {
            setCurrentUser(user);
          })
          .catch(() => {
            showMessage({
              name: 'failure',
              title: 'Не удалось войти в учетную запись',
              content: (<span className="popup__offer popup__offer_left">
                Попробуйте повторно авторизоваться
              </span>),
            });
          });
      })
      .catch(() => {
        showMessage({
          name: 'failure',
          title: 'Не удалось войти в учетную запись',
          content: (<span className="popup__offer popup__offer_left">
            Убедитесь, что вносите верные данные для авторизации
          </span>),
        });
      });
    setLoginPopupOpen(false);
  }

  function handleSaveCard(card) {
    const jwt = localStorage.getItem('jwt');

    connectMainApi.saveArticle({ jwt, card })
      .then((res) => {
        setSavedCards([...savedCards, res]);
      })
      .catch(() => {
        showMessage({
          name: 'failure',
          title: 'Не удалось сохранить карточку',
          content: (<span className="popup__offer popup__offer_left">
            Не удалось сохранить карточку, попробуйте позднее
          </span>),
        });
      });
  }

  function handleDeleteCard(cardId) {
    const jwt = localStorage.getItem('jwt');

    connectMainApi.deleteArticle({ jwt, cardId })
      .then(() => {
        setSavedCards(savedCards.filter((obj) => obj._id !== cardId));
      })
      .catch(() => {

      });
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

  function handleSearchSubmit(query) {
    setIsLoading(true);
    connectNewsApi.getNews(query)
      .then((res) => {
        const transformed = [];
        res.articles.forEach((obj) => {
          transformed.push({
            date: obj.publishedAt,
            keyword: query,
            title: obj.title,
            text: obj.description,
            source: obj.source.name,
            link: obj.url,
            image: obj.urlToImage,
          });
        });
        setCards(transformed);
        setIsLoading(false);
      })
      .catch(() => {
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
        showMessage({
          name: 'failure',
          title: 'Произошла ошибка при регистрации',
          content: (<span className="popup__offer popup__offer_left">
            Попробуйте зарегистрироваться позже
          </span>),
        });
      });
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
              Попробуйте почистить кэш в браузере и повторить попытку
            </span>),
          });
        });
    }
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (Object.keys(currentUser).length !== 0) {
      setLoggedIn(true);
      connectMainApi.getArticles({ jwt })
        .then((res) => {
          setSavedCards(res);
        })
        .catch(() => {
          console.log('Ошибка устаноки стейта сохраненных карточек');
        });
    } else {
      setLoggedIn(false);
      setCards([]);
      setSavedCards([]);
    }
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
          loggedIn={loggedIn}
          isLoading={isLoading}
          savedCards={savedCards}
          onDeleteCard={handleDeleteCard}
          component={Main}
        />

        <Route path='/'>
          <Main
            isLoading={isLoading}
            loggedIn={loggedIn}
            cards={cards}
            savedCards={savedCards}
            onSaveCard={handleSaveCard}
            onDeleteCard={handleDeleteCard}
          />
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
