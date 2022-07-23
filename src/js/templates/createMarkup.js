import { save, load } from '../local-storage-service';
const LOCALSTORAGE_KEY = "genres";
const genres = load(LOCALSTORAGE_KEY);
// console.log(genres);

export function createGalleryMarkup(movies) {
    return movies.map(({ genre_ids, id, title, poster_path, release_date, vote_average }) => {
        
        const imgUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://via.placeholder.com/270x400/5C5A5B/FFFFFF/?Text=No+poster';
      
			let movieGenre = "";
			
			// for (const genre of genres) {
			// 	if (genre_ids.includes(genre.id)) {
			// 		movieGenre = g.name;
			// 	}
			// }

			// let res = genres.map(genre => return genre_ids.includes(genres.name));
        return `
        <li class="gallery__item">
                <img class="gallery__image" src="${imgUrl}" alt="Movie poster of ${title}" loading="lazy" data-id="${id}"/>
                <div class="info">
                    <h2 class="info-title">${title}</h2>
										<p class="info-meta">${genre_ids.slice(0, 2)} | ${release_date.slice(0, 4)}<span class="info-rate">${vote_average.toFixed(1)}</span></p>
                </div>
        </li>`
    }).join('');
};