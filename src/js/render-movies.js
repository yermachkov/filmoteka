import { refs } from './refs';
import pagination from './pagination';
// import './paginationBtnWorks';
import FilmsApiService from './fetch-api';
import { renderGallery } from './templates/render-gallery';
import './render-movies';

const filmsApi = new FilmsApiService();

popular();

function popular() {
  filmsApi.fetchTrendingFilms().then(paginationRenderBtn);
}

function search() {
  filmsApi.fetchFilmsOnSearch().then(paginationRenderBtn);
}

const ulTag = document.querySelector('.pagination ul');

ulTag.addEventListener('click', onClick);

function onClick(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  refs.gallery.innerHTML = '';
  const allNumbes = document.querySelectorAll('.numb');
  const arrowRight = document.querySelector('.arrow-right');
  const arrowLeft = document.querySelector('.arrow-left');

  if (evt.target === arrowLeft) {
    filmsApi.pageDecrement();
    if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
      search();
    } else popular();
  }

  for (const number of allNumbes) {
    if (evt.target === number) {
      filmsApi.setPage(Number(evt.target.textContent));
      if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
        search();
      } else popular();
    }
  }

  if (evt.target === arrowRight) {
    filmsApi.pageIncrement();
    if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
      search();
    } else popular();
  }
}

refs.searchForm.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
  event.preventDefault();
  filmsApi.resetPage();

  filmsApi.query = event.target.elements.userSearchQuery.value.trim();

  if (filmsApi.searchQuery === '' || filmsApi.searchQuery === ' ') {
    refs.searchError.classList.remove('is-hidden');
    return;
  }

  filmsApi.fetchFilmsOnSearch().then(response => {
    if (response.total_results === 0) {
      refs.searchError.classList.remove('is-hidden');
      ulTag.removeEventListener('click', onClick);
      return;
    }

    refs.searchError.classList.add('is-hidden');

    search();

    ulTag.addEventListener('click', onClick);
  });
}

function paginationRenderBtn(r) {
  const page = r.page;
  const totalPages = r.total_pages;
  renderGallery(r.results);
  pagination(totalPages, page);
}
