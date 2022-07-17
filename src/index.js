import FilmsApiService from './js/fetch-api';
import { createHomeCardsMarkup } from './js/createMarkup';

const filmsApi = new FilmsApiService();

const refs = {
    searchForm: document.querySelector('.header-form'),
    searchButton: document.querySelector('.header-form__btn'),
    filmCard: document.querySelector('.gallery'),
}

// refs.searchForm.addEventListener('submit', onSearch);

filmsApi.fetchTrendingFilms().then(response => {
    renderHomeGallery(response.results);
})

function renderHomeGallery(markup) {
    refs.filmCard.insertAdjacentHTML('beforeend', createHomeCardsMarkup(markup));
}























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
