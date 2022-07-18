export function cardMurkup(getImage) {
    console.log(getImage);

    const murkup = 
        `<div class="gallery__item">
            <a href="https://image.tmdb.org/t/p/w500${poster_path}.jpg"
            class="gallery__link">
                <img class="gallery__image" src="${title}" alt="${title}"
                loading="lazy" width="395" height="574"
    height: 574px;/>
                <div class="info">
                    <h1 class="info-title">${original_title}</h1>
                    <p class="info-item">${genre_ids} | ${crelease_date}</p>
                </div>
            </a>
        </div>`


    console.log(murkup);
    return murkup;
