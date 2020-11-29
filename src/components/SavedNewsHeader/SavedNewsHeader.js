import React from 'react';

import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <section className="saved-news">
      <h1 className="saved-news__title">Сохранённые статьи</h1>
      <p className="saved-news__message">Грета, у вас 5 сохранённых статей</p>
      <p className="saved-news__tags">
        По ключевым словам: <span className="saved-news__tags-bold">Природа</span>
        , <span className="saved-news__tags-bold">Тайга</span> и 2-м другим
      </p>
    </section>
  );
}

export default SavedNewsHeader;
