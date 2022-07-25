import { createGalleryMarkup, createLibraryMarkup } from './createMarkup';
import { refs } from '../refs';

export function renderGallery(moviesArr) {
    refs.gallery.innerHTML = createGalleryMarkup(moviesArr);
}

export function renderLibrary(movie) {
  refs.libraryGallery.insertAdjacentHTML("beforeend", createLibraryMarkup(movie));
}

export function clearLibraryGallery() {
  refs.libraryGallery.innerHTML = "";
}