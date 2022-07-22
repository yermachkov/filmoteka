import { createGalleryMarkup } from './createMarkup';
import { refs } from '../refs';

export function renderGallery(markup) {
    refs.gallery.innerHTML = createGalleryMarkup(markup);
}