import $ from "jquery";
import FilmsApiService from './fetch-api';
import { renderLibrary, clearLibraryGallery } from './templates/render-gallery';

const fetchApi = new FilmsApiService();

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
    )}
export { cardDelete, cardAdding};