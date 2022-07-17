import FilmsApiService from './js/fetch-api';
import { cardMurkup } from './js/cardMurkup';

const filmsApi = new FilmsApiService();

const refs = {
    searchForm: document.querySelector('.header-form'),
    searchButton: document.querySelector('.header-form__btn'),
    filmCard: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onSearch);

























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
