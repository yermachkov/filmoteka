import FilmsApiService from './js/fetch-api';
import { cardMurkup } from './js/cardMurkup';
// import onHeaderBtnClick from './js/current-header-button';

import pagination from './js/pagination';
import { createHomeCardsMarkup } from './js/createMarkup';
import './js/footerModal';
import './js/spinner';
import './js/film-modal';
import onHeaderBtnClick from './js/color-change-header-btn';

const filmsApi = new FilmsApiService();

const refs = {
    searchForm: document.querySelector('.header-form'),
    searchButton: document.querySelector('.header-form__btn'),
    filmCard: document.querySelector('.gallery'),
    headerButtons: document.querySelector('.header__buttons'),
    gallery: document.querySelector('.gallery__list'),
}

// refs.searchForm.addEventListener('submit', onSearch);
// refs.headerButtons.addEventListener('click', onHeaderBtnClick);

filmsApi.fetchTrendingFilms().then(response => {
    renderHomeGallery(response.results);
})

function renderHomeGallery(markup) {
    refs.gallery.innerHTML = createHomeCardsMarkup(markup);
}

const ulTag = document.querySelector('ul');
// console.log(pagination);

filmsApi.fetchTrendingFilms().then(r => {
  console.log(r);
  const page = r.page;
  const totalPages = r.total_pages;
  //   console.log(page, totalPages);
  pagination(totalPages, page);
});

// refs.searchForm.addEventListener('submit', onSearch);

// function onSearch(event) {
//     event.preventDefault();

//     filmsApi.query = event.currentTarget.elements.userSearchQuery.value;
//     if (filmsApi.query === '') {
//         return alert('пустая строка');
//     }
//     filmsApi.fetchFilmsOnSearch().then(data => {
//         console.log(data);
//         refs.filmCard.insertAdjacentHTML('beforeend', cardMurkup(data.results));
//     });

// }


