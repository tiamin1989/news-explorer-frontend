import apiKey from './constants';
import NewsApi from './NewsApi';
import MainApi from './MainApi';

const dateTo = new Date();
const formattedDateTo = `${dateTo.getFullYear()}-${dateTo.getMonth() + 1}-${dateTo.getDate()}`;

const dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - 7);
const formattedDateFrom = `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-${dateFrom.getDate()}`;
/* https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=[ваш_ключ] */
export const connectNewsApi = new NewsApi({
  baseUrl: `https://nomoreparties.co/news/v2/everything?language=ru&apiKey=${apiKey}&from=${formattedDateFrom}&to=${formattedDateTo}&pageSize=100`,
});

export const connectMainApi = new MainApi({
  baseUrl: 'https://api.diploma1989.students.nomoreparties.space',
});
