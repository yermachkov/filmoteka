import FilmsApiService from './fetch-api';
import { load } from './local-storage-service';
import { renderLibrary, clearLibraryGallery } from './templates/render-gallery';
import { viewSpinner, hideSpinner } from './spinner';

const WATCHED_KEY = 'watchedFilms';
const QUEUE_KEY = 'queueFilms';

const refs = {
  watchedBtn: document.querySelector('[name="watched"]'),
  queueBtn: document.querySelector('[name="queue"]')
}

const fetchApi = new FilmsApiService();
// const queueMovies = load(QUEUE_KEY);
// const watchedMovies = load(WATCHED_KEY);

onWatchedClick();

refs.watchedBtn.addEventListener('click', onWatchedClick);
refs.queueBtn.addEventListener('click', onQueueClick);


function onWatchedClick() {
  viewSpinner();
  setTimeout(() => {
    clearLibraryGallery();
  const watchedMovies = load(WATCHED_KEY);
  watchedMovies.map(movieId =>
    fetchApi.fetchFilmById(movieId).then(response => {
      renderLibrary(response);
    })
    )
      hideSpinner();
  }, 500);
   

};

function onQueueClick() {
  viewSpinner();
  setTimeout(() => {
  clearLibraryGallery();
  const queueMovies = load(QUEUE_KEY);
  queueMovies.map(movieId =>
  fetchApi.fetchFilmById(movieId).then(response => {
    renderLibrary(response);
   
  })  
    )
     hideSpinner();
    }, 500);
  
};



