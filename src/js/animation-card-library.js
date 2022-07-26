import $ from "jquery";
import FilmsApiService from './fetch-api';
import { renderLibrary } from './templates/render-gallery';

const fetchApi = new FilmsApiService();

const btnWatched = document.querySelector("#watched");
const btnQueue = document.querySelector("#queue");

function cardDelete(id) {
    $(`[data-id="${id}"]`).animate({
        padding: "0px",
        'margin-left': '-16px',
        'font-size': "0px",
        'opacity': '0',
    }, 400, function () {

        $(`[data-id="${id}"]`).remove();
    });
}
function cardAdding(id) {
    fetchApi.fetchFilmById(id).then(response => {
        renderLibrary(response)
    }
    )
}
    
function cardDeleteWatched(id) {
    if (btnWatched.classList.contains('current__button')) {
        console.log(btnWatched.classList.contains('current__button'))
        cardDelete(id);
        
    }
}

function cardAddingWatched(id) {
    if (btnWatched.classList.contains('current__button')) {
        console.log(btnWatched.classList.contains('current__button'))
        cardAdding(id);
    }
}

function cardDeleteQueue(id) {
    if (btnQueue.classList.contains('current__button')) {
        console.log((btnQueue.classList.contains('current__button')))
        cardDelete(id);
    }
}

function cardAddingQueue(id) {
    if (btnQueue.classList.contains('current__button')) {
        console.log((btnQueue.classList.contains('current__button')))
        cardAdding(id);
    }
}
export { cardDeleteWatched, cardAddingWatched, cardDeleteQueue, cardAddingQueue};