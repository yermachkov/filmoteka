import FilmsApiService from './fetch-api';
import { load } from './local-storage-service';
import { renderLibrary, clearLibraryGallery } from './templates/render-gallery';
import { viewSpinner, hideSpinner } from './spinner';

const WATCHED_KEY = 'watchedFilms';
const QUEUE_KEY = 'queueFilms';

const refs = {
  watchedBtn: document.querySelector('[name="watched"]'),
  queueBtn: document.querySelector('[name="queue"]'),
  gallery: document.querySelector('.library-gallery > div')
}

// const isWatchedBtnOn = watchedBtn.classList.contains('current__button');
// const isQueueBtnOn = queueBtn.classList.contains('current__button');

const fetchApi = new FilmsApiService();
// const watchedMovies = load(WATCHED_KEY);
// const queueMovies = load(QUEUE_KEY);


onWatchedClick();

refs.watchedBtn.addEventListener('click', onWatchedClick);
refs.queueBtn.addEventListener('click', onQueueClick);


function onWatchedClick() {
  removeNotification();
  clearLibraryGallery();
  const watchedMovies = load(WATCHED_KEY);
  
  if (watchedMovies.length === 0) {
    renderNotification('watched');
    return;
  }
 
  viewSpinner();
  setTimeout(() => {
    watchedMovies.map(movieId =>
    fetchApi.fetchFilmById(movieId).then(response => {
      renderLibrary(response);
    })
    )
  hideSpinner();
  }, 500);
   

};

function onQueueClick() {
  removeNotification();
  clearLibraryGallery();
  const queueMovies = load(QUEUE_KEY);
  
if (queueMovies.length === 0) {
    renderNotification('queue');
    return;
  }

  viewSpinner();
  setTimeout(() => {
  queueMovies.map(movieId =>
  fetchApi.fetchFilmById(movieId).then(response => {
    renderLibrary(response);  
  })  
    )
  hideSpinner();
    }, 500);
};


function createNotificationMarkup(listName) {
  return `
  <p class="library__notification">You haven't added movies to ${listName} yet</p>
  <div class="library__notification wrap">
    <p class="notification-text">Check out trending movies or search specific movie on <a href="/src/index.html" class="home-link">home page</a>.</p>
    <p class="notification-text">Just click on movie card and fill your library :)</p>
  </div>
  `
};

function renderNotification(listName) {
  refs.gallery.insertAdjacentHTML("beforeend", createNotificationMarkup(listName));
};

function removeNotification() {
  const elements = document.getElementsByClassName("library__notification");
      while(elements.length > 0){
    elements[0].parentNode.removeChild(elements[0]);
    }
}