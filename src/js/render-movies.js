import { refs } from './refs';
import { renderGallery } from './templates/render-gallery';
import FilmsApiService from './fetch-api';

const filmsApi = new FilmsApiService();

filmsApi.fetchTrendingFilms().then(response => {
  renderGallery(response.results);
  
});