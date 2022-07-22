const ulTag = document.querySelector('.pagination ul');

ulTag.addEventListener('click', onClick);

function onClick(evt) {
  refs.gallery.innerHTML = '';
  console.log(evt.target);

  if (evt.target === document.querySelector('.arrow-left')) {
    filmsApi.pageDecrement();
    filmsApi.fetchTrendingFilms().then(r => {
      console.log(r);
      const page = r.page;
      const totalPages = r.total_pages;

      console.log(evt.target);
      renderHomeGallery(r.results);
      pagination(totalPages, page);
      console.log(Number(document.querySelector('.numb').textContent));
    });
  }

  const allNumbes = document.querySelectorAll('.numb');
  for (const number of allNumbes) {
    if (evt.target === number) {
      filmsApi.setPage(Number(evt.target.textContent));
      filmsApi.fetchTrendingFilms().then(r => {
        console.log(r);
        const page = r.page;
        const totalPages = r.total_pages;

        console.log(evt.target);
        renderHomeGallery(r.results);
        pagination(totalPages, page);
      });
    }
  }

  if (evt.target === document.querySelector('.arrow-right')) {
    filmsApi.pageIncrement();
    filmsApi.fetchTrendingFilms().then(r => {
      console.log(r);
      const page = r.page;
      const totalPages = r.total_pages;

      renderHomeGallery(r.results);
      pagination(totalPages, page);
    });
  }
}
