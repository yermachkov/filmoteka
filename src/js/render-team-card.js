import { teamDAta } from "./team-data";

const memberCard = document.querySelector('.team__list');

const cardOfMemberRender = teamDAta.map(({ img, alt, name, pos, git, linked, insta }) => {
    return`<li class="team__item">                          
                <img src="${img}" alt="${alt}" width = 260> 

                <div class="team-div">
                    <h3 class="team-div__employee">${name}</h3>
                    <p class="team-div__position">${pos}</p>
                    <ul class="team-div__list">                
                        <li class="team-div__item">
                            <a class="team-div__link" href="${insta}">
                                <svg class="team-div__icon" width="20" height="20"> 
                                    <use href="/src/images/social-icons.svg#icon-instagram"></use> 
                                </svg>
                            </a>
                        </li>
                        <li class="team-div__item">
                            <a class="team-div__link" href="${git}">
                                <svg class="team-div__icon" width="20" height="20"> 
                                    <use href="/src/images/social-icons.svg#icon-linkedin"></use> 
                                </svg>
                            </a>
                        </li>
                        <li class="team-div__item">
                            <a class="team-div__link" href="${linked}">
                                <svg class="team-div__icon" width="20" height="20"> 
                                    <use href="/src/images/social-icons.svg#icon-git"></use> 
                                </svg>
                            </a>
                        </li>                                  
                    </ul>
                </div>
            </li>`
}).join('');

memberCard.insertAdjacentHTML('beforeend', cardOfMemberRender);

