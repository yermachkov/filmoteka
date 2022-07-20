import FilmsApiService from "./fetch-api";
import { filmModalMarkup } from "./film-modal-markup";

const filmsApiService = new FilmsApiService();
let id = null;
let markup = "";

const refs = {
    gallery: document.querySelector(".gallery"),
    backdrop: document.querySelector(".modal-backdrop"),
    closeFilmModalBtn: "",
    addToWatched: "",
    addToQueue: "",
}

refs.gallery.addEventListener('click', onOpenFilmModal);

function onOpenFilmModal(e) {
    e.preventDefault();
    id = e.target.dataset.id;
    getFilmModal(id);
        
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    
    toggleModal();
}

const getFilmModal = async (filmID) => {
    
    try {
        const data = await filmsApiService.fetchFilmById(filmID);
        const listOfGenders = await data.genres.map(genre => genre.name).join(', ');
        const filmData = {...data, listOfGenders};
        // console.log(filmData);
        markup = filmModalMarkup(filmData);
        refs.backdrop.innerHTML = markup;
        getRefsOfBtns();
        refs.closeFilmModalBtn.addEventListener('click', onCloseFilmModal);
        refs.backdrop.addEventListener('click', onBackdropClose);
        window.addEventListener('keydown', onEscapeClose);
        return refs.backdrop;
    }

    catch (error) {
        console.log(error.message);
    }
}

function getRefsOfBtns() {
    refs.closeFilmModalBtn = document.querySelector(".modal__close");
    refs.addToWatched = document.querySelector(".add-to-watched");
    refs.addToQueue = document.querySelector(".add-to-queue");
    return refs;
}

function onCloseFilmModal(e) {
    e.preventDefault();
    toggleModal();
    refs.backdrop.innerHTML = "";
    console.log(refs.backdrop);
    removeAllEventListeners();
}

function onEscapeClose(e) {
    e.preventDefault();
    if (e.code === 'Escape') {
        toggleModal();
        refs.backdrop.innerHTML = "";
        removeAllEventListeners();
    }
}

function onBackdropClose(e) {
    e.preventDefault();
    if (e.currentTarget === e.target) {
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
