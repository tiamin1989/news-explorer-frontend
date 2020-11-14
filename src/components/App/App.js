import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect, useHistory } from 'react-router-dom';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Navigation from '../Navigation/Navigation.js';
import NewsCard from '../NewsCard/NewsCard.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import Preloader from '../Preloader/Preloader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SearchForm from '../SearchForm/SearchForm.js';

import logo from '../../logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
