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
    localStorage.setItem('page', JSON.stringify(filmsApi.getPage()));
    if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
      search();
    } else popular();
  }

  for (const number of allNumbes) {
    if (evt.target === number) {
      filmsApi.setPage(Number(evt.target.textContent));
      localStorage.setItem('page', JSON.stringify(filmsApi.getPage()));
      if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
        search();
      } else popular();
    }
  }

  if (evt.target === arrowRight) {
    filmsApi.pageIncrement();
    localStorage.setItem('page', JSON.stringify(filmsApi.getPage()));
    if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
      search();
    } else popular();
  }
}

refs.searchForm.addEventListener('submit', onSearchSubmit);
let request = [];

function onSearchSubmit(event) {
  event.preventDefault();
  filmsApi.resetPage();

  const x = event.target.elements.userSearchQuery.value.trim();
  request.push(x);
  localStorage.setItem('respon', JSON.stringify(request));
  filmsApi.query = x;

  // localStorage.setItem('search', filmsApi.query);

  if (filmsApi.searchQuery === '' || filmsApi.searchQuery === ' ') {
    refs.searchError.classList.remove('is-hidden');
    setTimeout(() => {
      refs.searchError.classList.add('is-hidden');
    }, 3000);
    return;
  }

  // filmsApi.setPage(JSON.parse(localStorage.getItem('page')));

  filmsApi.fetchFilmsOnSearch().then(response => {
    if (response.total_results === 0) {
      let y = JSON.parse(localStorage.getItem('respon'));
      console.log(y);
      const z = y.length - 2;
      console.log(y[z]);

      if (y[z] === undefined) {
        popular();
        filmsApi.query = '';
        refs.searchError.classList.remove('is-hidden');
        return;
      }
      filmsApi.setPage(JSON.parse(localStorage.getItem('page')));
      filmsApi.query = y[z];
      request.pop();

      search();
      refs.searchError.classList.remove('is-hidden');
      setTimeout(() => {
        refs.searchError.classList.add('is-hidden');
      }, 3000);
      return;
    }

    refs.searchError.classList.add('is-hidden');

    search();
    console.log(request);
    ulTag.addEventListener('click', onClick);
  });
}

function paginationRenderBtn(r) {
  console.log(r);
  const page = r.page;
  const totalPages = r.total_pages;
  renderGallery(r.results);
  pagination(totalPages, page);
}
