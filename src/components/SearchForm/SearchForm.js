import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form action="POST" id="search__form" className="search__form">
        <span className="search__form-mail">
          <input type="text" placeholder="Введите тему новости" className="search__form-mail-input" />
          <input type="submit" value="Искать" className="search__submit" />
        </span>
      </form>
    </section>
  );
}

export default SearchForm;
