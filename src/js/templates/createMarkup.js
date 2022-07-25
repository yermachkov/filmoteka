import { save, load } from '../local-storage-service';
const LOCALSTORAGE_KEY = "genres";
const genres = load(LOCALSTORAGE_KEY);
// console.log(genres);

export function createGalleryMarkup(movies) {
    return movies.map(({ genre_ids, id, title, poster_path, release_date }) => {
        
      const imgUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://via.placeholder.com/395x574?text=No+poster';
      
      const release = release_date ? release_date.slice(0, 4) : "No release date";
      
      let movieGenres = "";
        
        if (genre_ids.length > 3) {
          movieGenres = genres
            .filter(({ id }) => genre_ids.includes(id))
            .map(({ name }) => name)
            .slice(0, 2)
            .join(', ') + ", Other | ";
        } else if (genre_ids.length > 0) {
          movieGenres = genres
            .filter(({ id }) => genre_ids.includes(id))
            .map(({ name }) => name)
            .join(', ') + " | ";
        } else {
          movieGenres = "";
        }
      
        return `
        <li class="gallery__item">
                <img class="gallery__image" src="${imgUrl}" alt="Movie poster of ${title}" loading="lazy" data-id="${id}"/>
                <div class="info">
                    <h2 class="info-title">${title}</h2>
										<p class="info-meta">${movieGenres}${release}</p>
                </div>
        </li>`
    }).join('');
};


export function createLibraryMarkup({ genres, id, title, poster_path, release_date, vote_average }) {
        
  const imgUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/395x574?text=No+poster';
      
  const release = release_date ? release_date.slice(0, 4) : "No release date";

  const vote = vote_average > 0.1 ? vote_average.toFixed(1) : "No rating";
      
  let movieGenres = "";
    if (genres.length > 3) {
      movieGenres = genres
        .map(genre => genre.name)
        .slice(0, 2)
        .join(', ') + ", Other";
  } else {
    movieGenres = genres
      .map(genre => genre.name)
      .join(', ');
  }
      
        return `
        <li class="gallery__item" data-id="${id}">
                <img class="gallery__image" src="${imgUrl}" alt="Movie poster of ${title}" loading="lazy" data-id="${id}"/>
                <div class="info">
                    <h2 class="info-title">${title}</h2>
										<p class="info-meta">${movieGenres} | ${release}<span class="info-rate">${vote}</span></p>
                </div>
        </li>`
};