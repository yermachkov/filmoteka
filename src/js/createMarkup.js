const IMG_BASE_URL = 'https://image.tmdb.org/t/p';


export function createHomeCardsMarkup(data) {
    return data.map(({ genre_ids, id, title, poster_path, release_date }) => {
        return `
        <li class="gallery__item">
            <a href="#" class="gallery__link" data-id="${id}>
                <img class="gallery__image" src="${IMG_BASE_URL}/500w${poster_path}" alt="Movie poster of ${title}" loading="lazy" width="395" height="574"/>
                <div class="info">
                    <h2 class="info-title">${title}</h2>
                    <p class="info-item">${genre_ids} | ${release_date}</p>
                </div>
            </a>
        </li>`
    }).join('');
};



// export function cardMurkup(getImage) {
//     console.log(getImage);

//     const murkup = 
//         `<div class="gallery__item">
//             <a href="https://image.tmdb.org/t/p/w500${poster_path}.jpg"
//             class="gallery__link">
//                 <img class="gallery__image" src="${title}" alt="${title}"
//                 loading="lazy" width="395" height="574"
//     height: 574px;/>
//                 <div class="info">
//                     <h1 class="info-title">${original_title}</h1>
//                     <p class="info-item">${genre_ids} | ${crelease_date}</p>
//                 </div>
//             </a>
//         </div>`
   

//     console.log(murkup);
//     return murkup;
        
// }









