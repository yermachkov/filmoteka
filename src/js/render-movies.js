import { refs } from './refs';
import pagination from './pagination';
// import './paginationBtnWorks';
import FilmsApiService from './fetch-api';
import { renderGallery } from './templates/render-gallery';
import './render-movies';

const filmsApi = new FilmsApiService();

popular();

function popular() {
  filmsApi.fetchTrendingFilms().then(r => {
    const page = r.page;
    const totalPages = r.total_pages;
    renderGallery(r.results);
    pagination(totalPages, page);
  });
}

function search() {
  filmsApi.fetchFilmsOnSearch().then(r => {
    const page = r.page;
    const totalPages = r.total_pages;
    renderGallery(r.results);
    pagination(totalPages, page);
  });
}

const ulTag = document.querySelector('.pagination ul');

ulTag.addEventListener('click', onClick);

function onClick(evt) {
    if (evt.target.nodeName !== 'LI') {
        return;
    }
    console.log(evt.target);
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
        console.log('Ви натиснули кнопку вліво');
        filmsApi.pageDecrement();
        if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
          search();
        } else popular();
    }

    // const allNumbes = document.querySelectorAll('.numb');
    for (const number of allNumbes) {
        if (evt.target === number) {
            console.log('Ви натиснули кнопку з цифрою');
            filmsApi.setPage(Number(evt.target.textContent));
            if (filmsApi.searchQuery !== null && filmsApi.searchQuery !== '') {
                search();
            } else popular();
        }
    }

    if (
        evt.target === arrowRight ||
        evt.target === svgRight ||
        evt.target === svgPathRight
    ) {
        console.log('Ви натиснули кнопку вправо');  
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

        if (filmsApi.searchQuery === "" || filmsApi.searchQuery === " ") {
          refs.searchError.classList.remove('is-hidden');
          return;
        };

    filmsApi.fetchFilmsOnSearch().then(response => {
        if (response.total_results === 0) {
          refs.searchError.classList.remove('is-hidden');
          return;
        };

    refs.searchError.classList.add('is-hidden'); 
    
    search();
    
    ulTag.addEventListener('click', onClick);
    });
};