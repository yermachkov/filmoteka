import FilmsApiService from './js/fetch-api';
import { cardMurkup } from './js/cardMurkup';
import onHeaderBtnClick from './js/current-header-button';


const filmsApi = new FilmsApiService();

const refs = {
    searchForm: document.querySelector('.header-form'),
    searchButton: document.querySelector('.header-form__btn'),
    filmCard: document.querySelector('.gallery'),
    headerButtons: document.querySelector('.header__buttons'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.headerButtons.addEventListener('click', onHeaderBtnClick);


























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
