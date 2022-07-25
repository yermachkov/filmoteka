import FilmsApiService from './fetch-api';
import { load } from './local-storage-service';
import { renderLibrary, clearLibraryGallery } from './templates/render-gallery';

const WATCHED_KEY = 'watchedFilms';
const QUEUE_KEY = 'queueFilms';

const refs = {
  watchedBtn: document.querySelector('[name="watched"]'),
  queueBtn: document.querySelector('[name="queue"]')
}

const fetchApi = new FilmsApiService();
const queueMovies = load(QUEUE_KEY);
const watchedMovies = load(WATCHED_KEY);

onWatchedClick();

refs.watchedBtn.addEventListener('click', onWatchedClick);
refs.queueBtn.addEventListener('click', onQueueClick);


function onWatchedClick() {
  clearLibraryGallery();
  watchedMovies.map(movieId =>
    fetchApi.fetchFilmById(movieId).then(response => {
      renderLibrary(response);
    })
  )
};

function onQueueClick() {
  clearLibraryGallery();
  queueMovies.map(movieId =>
  fetchApi.fetchFilmById(movieId).then(response => {
  renderLibrary(response);
  })
)
};



