import FilmsApiService from './fetch-api';
import { save, load } from './local-storage-service';

const LOCALSTORAGE_KEY = "genres";
const filmsApi = new FilmsApiService();

filmsApi.fetchGenres().then(response => {
    save(LOCALSTORAGE_KEY, response);    
}
);

console.log(load(LOCALSTORAGE_KEY));