import FilmsApiService from './fetch-api';
const fetchApi = new FilmsApiService();
const ulTag = document.querySelector('.pagination ul');

let page = fetchApi.page;

// const totalPages = 20;
export default function element(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 2;
  let afterPages = page + 2;
  if (page > 1) {
    liTag += `<li class="arrow-left" onclick="element(totalPages, ${page - 1})">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333"
              stroke-width="1.333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>`;
  }

  if (page > 2 && page != 3) {
    liTag += `<li class="numb" onclick="element(totalPages, 1)"><span>1</span></li>`;
    if (page > 4) {
      liTag += `<li class="dots"><span>. . .</span></li>`;
    }
  }

  if (page == 1) {
    afterPages += 2;
  } else if (page == 2) {
    afterPages += 1;
  }

  if (page == totalPages) {
    beforePages -= 2;
  } else if (page == totalPages - 1) {
    beforePages -= 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > totalPages || pageLength < 1) {
      continue;
    }

    if (pageLength == 0) {
      pageLength += 1;
    }

    if (page == pageLength) {
      activeLi = 'active-btn';
    } else {
      activeLi = '';
    }
    liTag += `<li class="numb ${activeLi}" onclick="element(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }

  if (page < totalPages - 1 && page != totalPages - 2) {
    if (page < totalPages - 3) {
      liTag += `<li class="dots"><span>. . .</span></li>`;
    }
    liTag += `<li class="numb" onclick="element(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="arrow-right" onclick="element(totalPages, ${
      page + 1
    })">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333"
              stroke-width="1.333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>`;
  }
  ulTag.innerHTML = liTag;
}

// element(totalPages, 5);
