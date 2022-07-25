import FilmsApiService from "./fetch-api";

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const arrayUrlTrailers = []
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
    id = e.target.dataset.id
    await getTrailerModal(id);
}

const getTrailerModal = async (filmID) => {
    try {
        const trailerData = await filmsApiService.fetchTrailerById(filmID);
        createYoutubeUrl(trailerData);
        setTimeout(() => {
            refs.watchTrailer = document.querySelector('.player');
            refs.watchTrailer.addEventListener('click', onOpenTrailerModal);
        }, 300)
    }
    catch (error) {
        console.log(error.message);
    }
}

function createYoutubeUrl(data) {
    data.results.forEach(obj => {
        if (obj.name.includes('Official Trailer')) {
            const youtubeKey = obj.key;
            arrayUrlTrailers.push(`https://www.youtube.com/embed/${youtubeKey}`)
            youtubeUrl = arrayUrlTrailers[0];
        }
    });
}

function onOpenTrailerModal(){
    const openTrailer = basicLightbox.create(`
    <iframe width="320" height="240" src='${youtubeUrl}'frameborder="0" allowfullscreen class="trailer_video"></iframe>`);

openTrailer.show();
}