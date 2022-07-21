import FilmsApiService from './js/fetch-api';
import { cardMurkup } from './js/cardMurkup';
// import onHeaderBtnClick from './js/current-header-button';

import pagination from './js/pagination';
import { createHomeCardsMarkup } from './js/createMarkup';
import './js/footerModal';
import './js/team-data';
import './js/render-team-card';
import './js/spinner';
import './js/film-modal';
import './js/get-genres';
import onHeaderBtnClick from './js/color-change-header-btn';

const filmsApi = new FilmsApiService();

const refs = {
  searchForm: document.querySelector('.header-form'),
  searchButton: document.querySelector('.header-form__btn'),
  filmCard: document.querySelector('.gallery'),
  headerButtons: document.querySelector('.header__buttons'),
  gallery: document.querySelector('.gallery__list'),
};

// refs.searchForm.addEventListener('submit', onSearch);

// refs.headerButtons.addEventListener('click', onHeaderBtnClick);

filmsApi.fetchTrendingFilms().then(response => {
  renderHomeGallery(response.results);
});

function renderHomeGallery(markup) {
  refs.gallery.innerHTML = createHomeCardsMarkup(markup);
}

filmsApi.fetchTrendingFilms().then(r => {
  console.log(r);
  const page = r.page;
  const totalPages = r.total_pages;

  renderHomeGallery(r.results);
  pagination(totalPages, page);
});

const ulTag = document.querySelector('.pagination ul');

ulTag.addEventListener('click', onClick);
// console.log(pagination(totalPages, page));
// pagination(20, 5);

function onClick(evt) {
  refs.gallery.innerHTML = '';
  console.log(evt.target);

  if (evt.target === document.querySelector('.arrow-left')) {
    filmsApi.pageDecrement();
    filmsApi.fetchTrendingFilms().then(r => {
      console.log(r);
      const page = r.page;
      const totalPages = r.total_pages;

      console.log(evt.target);
      renderHomeGallery(r.results);
      pagination(totalPages, page);
      console.log(Number(document.querySelector('.numb').textContent));
    });
  }

  if (evt.target === document.querySelector('.numb')) {
    filmsApi.Page(Number(document.querySelector('.numb').textContent));
    filmsApi.fetchTrendingFilms().then(r => {
      console.log(r);
      const page = r.page;
      const totalPages = r.total_pages;

      console.log(evt.target);
      renderHomeGallery(r.results);
      pagination(totalPages, page);
    });
  }

  if (evt.target === document.querySelector('.arrow-right')) {
    filmsApi.pageIncrement();
    filmsApi.fetchTrendingFilms().then(r => {
      console.log(r);
      const page = r.page;
      const totalPages = r.total_pages;

      renderHomeGallery(r.results);
      pagination(totalPages, page);
    });
  }
}
