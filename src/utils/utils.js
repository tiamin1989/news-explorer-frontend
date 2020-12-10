import NewsApi from './NewsApi';
import MainApi from './MainApi';
import { apiKey, newsDaysToShow } from './constants';

const dateTo = new Date();
const formattedDateTo = `${dateTo.getFullYear()}-${dateTo.getMonth() + 1}-${dateTo.getDate()}`;

const dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - newsDaysToShow);
const formattedDateFrom = `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-${dateFrom.getDate()}`;
/* https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=[ваш_ключ] */
export const connectNewsApi = new NewsApi({
  baseUrl: `https://nomoreparties.co/news/v2/everything?language=ru&apiKey=${apiKey}&from=${formattedDateFrom}&to=${formattedDateTo}&pageSize=100`,
});

export const connectMainApi = new MainApi({
  baseUrl: 'https://api.diploma1989.students.nomoreparties.space',
});

export function showDate(dateToFormat) {
  const months = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря',
  };
  const extracted = dateToFormat.replace(/T\d{2}:\d{2}:\d{2}(.000)?Z/, '').split('-');
  return `${extracted[2]} ${months[extracted[1]]}, ${extracted[0]}`;
}
