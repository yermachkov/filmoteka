import { refs } from './refs';
import { renderGallery } from './templates/render-gallery';
import FilmsApiService from './fetch-api';

const filmsApi = new FilmsApiService();


filmsApi.fetchTrendingFilms().then(response => {
  renderGallery(response.results);
  
});


refs.searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();

  filmsApi.query = event.target.elements.userSearchQuery.value.trim();

    if (filmsApi.searchQuery === "" || filmsApi.searchQuery === " ") {
      refs.searchError.classList.remove('is-hidden');
      return;
    };

  filmsApi.fetchFilmsOnSearch().then(response => {
     if (response.total_results === 0) {
      refs.searchError.classList.remove('is-hidden');
      return;
    };

    refs.searchError.classList.add('is-hidden'); 
    renderGallery(response.results);
    } 
  );
};