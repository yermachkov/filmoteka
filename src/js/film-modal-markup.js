export function filmModalMarkup({poster_path, title, vote_average, vote_count, popularity, original_title, listOfGenders, overview, id}) {
    
    const imgUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://via.placeholder.com/270x400/5C5A5B/ffffff.png?text=NO+POSTER';
    const description = overview
        ? overview
        : 'Unfortunately we have no discription about this film';
    const originalTitle = original_title
        ? original_title
        : 'No Title';
    const genres = listOfGenders
        ? listOfGenders
        : 'Genres did not marked';
    const vote = vote_average > 0.1
        ? vote_average.toFixed(1)
        : "0";
    const pop = popularity > 0.1
        ? popularity.toFixed(1)
        : "0";

    return `
    <div class="modal" data-modal-id="${id}">
        <div class="modal__poster">
            <img
                class="modal__img"
                src="${imgUrl}"
                alt="${title}"
                />
        </div>
    
        <div class="modal__content">
            <h2 class="modal__content-title">${title}</h2>
            <table class="modal__content-info">
                <tr>
                    <td class="modal__content-name">Vote / Votes</td>
                    <td class="modal__content-name-value">
                        <span class="modal__content-rate">${vote}</span>
                        /
                        <span class="modal__content-rates">${vote_count}</span>
                    </td>
                </tr>
                <tr>
                    <td class="modal__content-name">Popularity</td>
                    <td class="modal__content-name-value">${pop}</td>
                </tr>
                <tr>
                    <td class="modal__content-name">Original Title</td>
                    <td class="modal__content-name-value--title">${originalTitle}</td>
                </tr>
                <tr>
                    <td class="modal__content-name">Genre</td>
                    <td class="modal__content-name-value">${genres}</td>
                </tr>
            </table>
        
            <div class="modal__about">
                <h3 class="modal__about-title">About</h3>
                <p class="modal__about-description">${description}</p>
            </div>
        
            <div class="modal__btns">
                <div class="modal__btns-wrapper">
                    <button class="modal__btn add-to-watched" type="button" data-modalaction="${id}">
                    Add to watched
                    </button>
                    <button class="modal__btn add-to-queue" type="button" data-modalaction="${id}">
                    Add to queue
                    </button>
                </div>
                <button  type="button" class="modal__btn player" data-player-action="${id}">watch the trailer</button>
            </div>
            <button class="modal__close" type="button" data-modal-close aria-label="close-modal">
                <svg class="modal__close-svg" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L22 22" stroke="black" stroke-width="2"/>
                    <path d="M8 22L22 8" stroke="black" stroke-width="2"/>
                </svg>
            </button>
        </div>
    </div>
    `
}