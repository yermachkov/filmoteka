import { refs } from './refs';
import pagination from './pagination';
// import './paginationBtnWorks';
import FilmsApiService from './fetch-api';
import { renderGallery } from './templates/render-gallery';

const filmsApi = new FilmsApiService();

filmsApi.fetchTrendingFilms().then(r => {
  console.log(r);
  const page = r.page;
  const totalPages = r.total_pages;

  renderGallery(r.results);
  pagination(totalPages, page);
});

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
  const svgRight = document.querySelector('.arrow-right svg');
  const svgPathRight = document.querySelector('.arrow-right svg path');
  const svgLeft = document.querySelector('.arrow-left svg');
  const svgPathLeft = document.querySelector('.arrow-left svg path');

  if (
    evt.target === arrowLeft ||
    evt.target === svgLeft ||
    evt.target === svgPathLeft
  ) {
    filmsApi.pageDecrement();
    filmsApi.fetchTrendingFilms().then(r => {
      const page = r.page;
      const totalPages = r.total_pages;

      renderGallery(r.results);
      pagination(totalPages, page);
      console.log(Number(document.querySelector('.numb').textContent));
    });
  }

  // const allNumbes = document.querySelectorAll('.numb');
  for (const number of allNumbes) {
    if (evt.target === number) {
      filmsApi.setPage(Number(evt.target.textContent));
      filmsApi.fetchTrendingFilms().then(r => {
        const page = r.page;
        const totalPages = r.total_pages;

        renderGallery(r.results);
        pagination(totalPages, page);
      });
    }
  }

  if (
    evt.target === arrowRight ||
    evt.target === svgRight ||
    evt.target === svgPathRight
  ) {
    filmsApi.pageIncrement();
    filmsApi.fetchTrendingFilms().then(r => {
      const page = r.page;
      const totalPages = r.total_pages;

      renderGallery(r.results);
      pagination(totalPages, page);
    });
  }
}
