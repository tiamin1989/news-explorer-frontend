import React from 'react';
import PropTypes from 'prop-types';

import './SearchForm.css';

function SearchForm({ onSearchSubmit, onError }) {
  const reqInput = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    if (/[^\s]/.test(reqInput.current.value)) onSearchSubmit(reqInput.current.value);
    else {
      onError({
        name: 'failure',
        title: 'Нужно ввести ключевое слово',
        content: (<span className="popup__offer popup__offer_left">
          Чтобы получить список новостей, необходимо ввести ключевое слово
        </span>),
      });
    }
  }

  return (
    <section className="search">
      <h1 className="search__title">Что творится в мире?</h1>
      <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form action="POST" id="search__form" className="search__form" onSubmit={handleSubmit}>
        <span className="search__form-mail">
          <input ref={reqInput} type="text" placeholder="Введите тему новости" className="search__form-mail-input" required />
          <input type="submit" value="Искать" className="search__submit" />
        </span>
      </form>
    </section>
  );
}

SearchForm.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  onError: PropTypes.func,
};

export default SearchForm;
