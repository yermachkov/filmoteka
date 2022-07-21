
// import onHeaderBtnClick from './js/current-header-button';
import './js/refs';
import './js/render-movies';
import pagination from './js/pagination';

import './js/footerModal';
import './js/team-data';
import './js/render-team-card';
import './js/spinner';
import './js/film-modal';
import './js/get-genres';
import onHeaderBtnClick from './js/color-change-header-btn';




// refs.searchForm.addEventListener('submit', onSearch);
// refs.headerButtons.addEventListener('click', onHeaderBtnClick);


import FilmsApiService from './js/fetch-api';
const filmsApi = new FilmsApiService();
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


