import React from 'react';
import './About.css';
import aboutPhoto from '../../images/about-photo.png';

function About() {
  return (
    <section className="about">
      <img src={aboutPhoto} alt="Это я" className="about__photo" />
      <div className="about__wrapper">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__paragraph">
          Это блок с описанием автора проекта. Здесь следует указать, как вас зовут,
          чем вы занимаетесь, какими технологиями разработки владеете.
        </p>
        <p className="about__paragraph">
          Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и
          чем можете помочь потенциальным заказчикам.
        </p>
      </div>
    </section>
  );
}

export default About;
