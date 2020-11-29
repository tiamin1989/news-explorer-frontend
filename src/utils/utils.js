import apiKey from './constants';
import NewsApi from './NewsApi';

const dateTo = new Date();
const formattedDateTo = `${dateTo.getFullYear()}-${dateTo.getMonth() + 1}-${dateTo.getDate()}`;

const dateFrom = new Date();
dateFrom.setDate(dateFrom.getDate() - 7);
const formattedDateFrom = `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-${dateFrom.getDate()}`;

const connectNewsApi = new NewsApi({
  baseUrl: `https://newsapi.org/v2/everything?apiKey=${apiKey}&from=${formattedDateFrom}&to=${formattedDateTo}&pageSize=100`,
});

export default connectNewsApi;
