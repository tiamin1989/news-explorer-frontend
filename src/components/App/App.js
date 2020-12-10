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

  const [updateCards, setUpdateCards] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

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

  function handleShowOffer() {
    showMessage({
      name: 'failure',
      title: 'Необходимо авторизоваться',
      content: (<span className="popup__offer popup__offer_left">
        Для сохранения карточек в учетной записи необходимо авторизоваться
      </span>),
    });
  }

  function handleLoginClick() {
    closeAllPopups();
    setLoginPopupOpen(true);
  }

  function handleShowSavedPages() {
    showMessage({
      name: 'failure',
      title: 'Необходимо авторизоваться',
      content: (<span className="popup__offer popup__offer_left">
        Для просмотра сохраненных статей необходимо <a className="popup__offer-link" href="#" onClick={handleLoginClick}>войти</a>
      </span>),
    });
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
      .catch((err) => {
        showMessage({
          name: 'failure',
          title: `Ошибка ${err.status}`,
          content: (<span className="popup__offer popup__offer_left">
            {err.statusText}
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
      .catch((err) => {
        showMessage({
          name: 'failure',
          title: `Ошибка ${err.status}`,
          content: (<span className="popup__offer popup__offer_left">
            {err.statusText}
          </span>),
        });
      });
  }

  function handleRegisterClick() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(true);
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
        if (transformed) {
          setCards(transformed);
          localStorage.setItem('cards', JSON.stringify(transformed));
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsSearching(true);
        }
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
    setIsLoading(false);
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
    const storageCards = localStorage.getItem('cards');
    if (storageCards) {
      setUpdateCards(true);
    }
  }, []);

  React.useEffect(() => {
    if (updateCards) {
      const storageCards1 = localStorage.getItem('cards');
      setCards(JSON.parse(storageCards1));
      setUpdateCards(false);
      setIsSearching(true);
    }
  }, [updateCards]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (Object.keys(currentUser).length !== 0) {
      setLoggedIn(true);
      connectMainApi.getArticles({ jwt })
        .then((res) => {
          setSavedCards(res);
        })
        .catch((err) => {
          showMessage({
            name: 'failure',
            title: `Ошибка ${err.status}`,
            content: (<span className="popup__offer popup__offer_left">
              {err.statusText}
            </span>),
          });
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
          onSaveCard={handleSaveCard}
          onDeleteCard={handleDeleteCard}
          showOffer={handleShowSavedPages}
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
            showOffer={handleShowOffer}
            isSearching={isSearching}
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
