import FilmsApiService from "./fetch-api";
import { filmModalMarkup } from "./film-modal-markup";
import {
    addToStorage,
    addToStorageWhenNull,
    removeFromStorage,
    checkItemInStorage,
} from './storage';
import { inStorageWatched } from "./storage";
import { inStorageQueue } from "./storage";

const filmsApiService = new FilmsApiService();
let id;
let markup = "";
const ADD_TO_WATCHED = 'Add to watched';
const ADD_TO_QUEUE = 'Add to queue';
const REMOVE_FROM_WATCHED = 'Remove from watched';
const REMOVE_FROM_QUEUE = 'Remove from queue';

let refs = {
    gallery: document.querySelector(".gallery"),
    backdrop: document.querySelector(".modal-backdrop"),
    closeFilmModalBtn: "",
    addToWatched: "",
    addToQueue: "",
}

checkItemInStorage("watchedFilms", "queueFilms", []);
refs.gallery.addEventListener('click', onOpenFilmModal);

async function onOpenFilmModal(e) {
    e.preventDefault();
    id = e.target.dataset.id;
            
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    toggleModal();
    await getFilmModal(id);

    refs.gallery.removeEventListener('click', onOpenFilmModal);
    refs.addToWatched.addEventListener('click', onAddToWatchedClick);
    refs.addToQueue.addEventListener('click', onAddToQueueClick);
}

const getFilmModal = async (filmID) => {
    try {
        const data = await filmsApiService.fetchFilmById(filmID);
        const listOfGenders = await data.genres.map(genre => genre.name).join(', ');
        const filmData = {...data, listOfGenders};
        // console.log(filmData);
        markup = filmModalMarkup(filmData);
        refs.backdrop.innerHTML = markup;
        
        refs.closeFilmModalBtn = document.querySelector("[data-modal-close]");
        refs.addToWatched = document.querySelector(".add-to-watched");
        refs.addToQueue = document.querySelector(".add-to-queue");
        
        await onWatchedButtonTextWhenOpenModal(filmID);
        await onQueueButtonTextWhenOpenModal(filmID);
        await determineButtonStateWhenOpenModal();
        
        refs.closeFilmModalBtn.addEventListener('click', onCloseFilmModal);
        refs.backdrop.addEventListener('click', onBackdropClose);
        window.addEventListener('keydown', onEscapeClose);

        return refs.backdrop;
    }

    catch (error) {
        console.log(error.message);
    }
}

function onCloseFilmModal(e) {
    e.preventDefault();
    refs.gallery.addEventListener('click', onOpenFilmModal);
    toggleModal();
    refs.backdrop.innerHTML = "";
    removeAllEventListeners();
}

function onEscapeClose(e) {
    e.preventDefault();
    if (e.code === 'Escape') {
        refs.gallery.addEventListener('click', onOpenFilmModal);
        toggleModal();
        refs.backdrop.innerHTML = "";
        removeAllEventListeners();
    }
}

function onBackdropClose(e) {
    e.preventDefault();
    if (e.currentTarget === e.target) {
        refs.gallery.addEventListener('click', onOpenFilmModal);
        toggleModal();
        refs.backdrop.innerHTML = "";
        removeAllEventListeners();
    }
}

function toggleModal() {
    refs.backdrop.classList.toggle("is-hidden");
}

function removeAllEventListeners() {
    refs.closeFilmModalBtn.removeEventListener('click', onCloseFilmModal);
    window.removeEventListener('keydown', onEscapeClose);
    refs.backdrop.removeEventListener('click', onBackdropClose);
}

function onAddToWatchedClick(e) {
    e.preventDefault();
    id = e.target.dataset.modalaction;
    // console.log(id);
    // console.log("Ви натиснули на кнопку WATCHED, ID цієї картки - ", id);
    if (localStorage.getItem("watchedFilms") == null) {
        addToStorageWhenNull("watchedFilms", id);
    }
    if (!inStorageWatched(id)) {
        // отримуємо дані з localStorage, розпарсуємо дані у масив (watchedArray)
        // додаємо новий id до нього та записуємо до localStorage
        addToStorage("watchedFilms", id);
        // змінюємо назву та стан активності кнопок після кліку
        refs.addToWatched.textContent = REMOVE_FROM_WATCHED;
        refs.addToWatched.classList.add('is-in-storage');
    } else {
        // отримуємо дані з localStorage, розпарсуємо дані у масив (watchedArray)
        // видаляємо наш id з масиву та записуємо дані до localStorage
        removeFromStorage("watchedFilms", id);
        // змінюємо назву та стан активності кнопок після кліку
        refs.addToWatched.textContent = ADD_TO_WATCHED;
        refs.addToWatched.classList.remove('is-in-storage');
    }
}

function onAddToQueueClick(e) {
    e.preventDefault();
    // console.log("Ви натиснули на кнопку QUEUE, ID цієї картки - ", id);
    if (localStorage.getItem("queueFilms") == null) {
        addToStorageWhenNull("queueFilms", id);
    }
    if (!inStorageQueue(id)) {
        // отримуємо дані з localStorage, розпарсуємо дані у масив (watchedArray)
        // додаємо новий id до нього та записуємо до localStorage
        
        addToStorage("queueFilms", id);
        // змінюємо назву та стан активності кнопок після кліку
        refs.addToQueue.textContent = REMOVE_FROM_QUEUE;
        refs.addToQueue.classList.add('is-in-storage');

    } else {
        // отримуємо дані з localStorage, розпарсуємо дані у масив (watchedArray)
        // видаляємо наш id з масиву та записуємо дані до localStorage
        removeFromStorage("queueFilms", id);
        // змінюємо назву та стан активності кнопок після кліку
        refs.addToQueue.textContent = ADD_TO_QUEUE;
        refs.addToQueue.classList.remove('is-in-storage');
    }
}

// пишемо текст кнопок, коли модалка відкривається

function onWatchedButtonTextWhenOpenModal(id) {
    if(!inStorageWatched(id)) {
        refs.addToWatched.textContent = ADD_TO_WATCHED;
        return;
    }
    if(inStorageWatched(id)) {
        refs.addToWatched.textContent = REMOVE_FROM_WATCHED;
    }
}

function onQueueButtonTextWhenOpenModal(id) {
    if(!inStorageQueue(id)) {
        refs.addToQueue.textContent = ADD_TO_QUEUE;
        return;
    }
    if(inStorageQueue(id)) {
        refs.addToQueue.textContent = REMOVE_FROM_QUEUE;
    }
}

// встановлюємо стан активності кнопок при відкритті модалки 
// з урахуванням localStorage

function determineButtonStateWhenOpenModal() {
    if (refs.addToWatched.textContent === ADD_TO_WATCHED) {
        refs.addToWatched.classList.remove('is-in-storage');
    } else {
        refs.addToWatched.classList.add('is-in-storage');
    }
    
    if (refs.addToQueue.textContent === ADD_TO_QUEUE) {
        refs.addToQueue.classList.remove('is-in-storage');
    } else {
        refs.addToQueue.classList.add('is-in-storage');
    }
}

