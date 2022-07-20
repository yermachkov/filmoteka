import FilmsApiService from './js/fetch-api';
import pagination from './js/pagination';
import { createHomeCardsMarkup } from './js/createMarkup';
import './js/footerModal';
import './js/spinner';

const filmsApi = new FilmsApiService();

const refs = {
  searchForm: document.querySelector('.header-form'),
  searchButton: document.querySelector('.header-form__btn'),
  filmCard: document.querySelector('.gallery'),
  gallery: document.querySelector('.gallery__list'),
};

// refs.searchForm.addEventListener('submit', onSearch);
// filmsApi.fetchTrendingFilms().then(response => {
//   renderHomeGallery(response.results);
// });

function renderHomeGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', createHomeCardsMarkup(markup));
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

    // if (evt.target === document.querySelector('.arrow-left')) {
    //   filmsApi.pageDecrement();
    //   filmsApi.fetchTrendingFilms().then(r => {
    //     console.log(r);
    //     const page = r.page;
    //     const totalPages = r.total_pages;

    //     console.log(evt.target);
    //     renderHomeGallery(r.results);
    //     pagination(totalPages, page);
    //   });
    // }

    // filmsApi.fetchTrendingFilms().then(r => {
    //   console.log(r);
    //   const page = r.page;
    //   const totalPages = r.total_pages;

    //   console.log(evt.target);
    //   if (evt.target === document.querySelector('.arrow-right')) {
    //     filmsApi.pageIncrement();
    //     renderHomeGallery(r.results);
    //     pagination(totalPages, page + 1);
    //   }
    // });
  }
}
