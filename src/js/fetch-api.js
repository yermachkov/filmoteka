import axios from "axios";

const API_KEY = '7a92417a5af1e8667d171d8c5ef3af4e';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';


export default class FilmsApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.genreId = null;
    this.movieId = null;
  }

  async fetchTrendingFilms() {
    try {
      const response = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
      return response.data;
      // returns an Object which contains { page, Array(20 items), total_pages, total_results}. 
    } catch (error) {
    console.error(error);
    }
  };

  async fetchFilmsOnSearch() {
    try {
      const response = await axios.get(`/search/movie?api_key=${API_KEY}&page=${this.page}&query=${this.searchQuery}`);
      return response.data;
       // returns an Object which contains { page, Array(20 items), total_pages, total_results}.
    }
    catch (error) {
      console.error(error);
    }
  };

  async fetchGeneres() {
    try {
      const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);
      return response.data;
    }
    catch (error) {
      console.error(error);
    };
    };

  async fetchFilmById() {
    try {
      const response = await axios.get(`/movie/${this.movieId}?api_key=${API_KEY}`);
      return response.data;
    }
    catch (error) {
      console.error(error);
    };
  };

  resetPage() {
    this.page = 1;
  };

  pageIncrement() {
    this.page += 1;
  };

  pageDecrement() {
    this.page -= 1;
}

  getPage() {
    return this.page;
  };

  setPage(newPage) {
    this.page = newPage;
  }
  
  get query() {
      return this.searchQuery;
    };

  set query(newQuery) {
      this.searchQuery = newQuery;
  };
  
  get id() {
    return this.movieId;
  };
  
  set id(newId) {
    this.movieId = newId;
  };
};
