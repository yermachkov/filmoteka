import FilmsApiService from "./fetch-api";

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

let arrayUrlTrailers = [];
const filmsApiService = new FilmsApiService();

let id;
let youtubeUrl;

let refs = {
    gallery: document.querySelector('.gallery'),
    watchTrailer: '',
}

refs.gallery.addEventListener('click', onImgClick);

async function onImgClick(e) {
    if(e.target.nodeName !== 'IMG'){
        return
    }
    id = e.target.dataset.id;
    await getTrailerModal(id);
}

const getTrailerModal = async (filmID) => {
    try {
        const trailerData = await filmsApiService.fetchTrailerById(filmID);
        youtubeUrl = null;
        arrayUrlTrailers = [];
        createYoutubeUrl(trailerData);
        setTimeout(() => {
            refs.watchTrailer = document.querySelector('.player');
            refs.watchTrailer.addEventListener('click', onOpenTrailerModal);
        }, 500)
    }
    catch (error) {
        console.log(error.message);
    }
}

function createYoutubeUrl(data) {
    data.results.forEach(obj => {
        if (obj.name.includes('Official')) {
            const youtubeKey = obj.key;
            arrayUrlTrailers.push(`https://www.youtube.com/embed/${youtubeKey}`);
            youtubeUrl = arrayUrlTrailers[0];
        }
    });
}

function onOpenTrailerModal(){
    if (youtubeUrl == null) {
        refs.watchTrailer.textContent = 'sorry, trailer is not found';
        return
    }
    const openTrailer = basicLightbox.create(`
    <iframe src='${youtubeUrl}'frameborder="0" allowfullscreen class="trailer_video"></iframe>`);

    openTrailer.show();
}