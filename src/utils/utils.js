import apiKey from './constants';
import NewsApi from './NewsApi';
import MainApi from './MainApi';

const dateTo = new Date();
const formattedDateTo = `${dateTo.getFullYear()}-${dateTo.getMonth() + 1}-${dateTo.getDate()}`;

const dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - 7);
const formattedDateFrom = `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-${dateFrom.getDate()}`;

export const connectNewsApi = new NewsApi({
  baseUrl: `https://newsapi.org/v2/everything?language=ru&apiKey=${apiKey}&from=${formattedDateFrom}&to=${formattedDateTo}&pageSize=100`,
});
console.log(formattedDateFrom);
export const connectMainApi = new MainApi({
  baseUrl: 'https://api.diploma1989.students.nomoreparties.space',
});
