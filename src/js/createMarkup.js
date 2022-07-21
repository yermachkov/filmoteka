
export function createHomeCardsMarkup(movies) {
    return movies.map(({ genre_ids, id, title, poster_path, release_date }) => {
        
        const imgUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://via.placeholder.com/150/360505/FFFFFF/?Text=No-poster';
        
        return `
        <li class="gallery__item">
                <img class="gallery__image" src="${imgUrl}" alt="Movie poster of ${title}" loading="lazy" data-id="${id}"/>
                <div class="info">
                    <h2 class="info-title">${title}</h2>
                    <p class="info-meta">${genre_ids.slice(0, 2)} | ${release_date.slice(0, 4)}</p>
                </div>
        </li>`
    }).join('');
};