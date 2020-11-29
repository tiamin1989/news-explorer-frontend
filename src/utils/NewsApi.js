class NewsApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  getNews(query) {
    return fetch(`${this.baseUrl}&q="${query}"`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.message));
      });
  }
}

export default NewsApi;
