import ImgFinder from './apiService';
import gallery from '../templates/card.hbs';

const refs = {
  searchBtn: document.querySelector('.search-btn'),
  searchInput: document.querySelector('.search-input'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
  toStart: document.querySelector('.to-start'),
};

const imgFinder = new ImgFinder();

refs.searchBtn.addEventListener('click', e => {
  const query = refs.searchInput.value;
  if (!query) {
    return;
  }
  if (imgFinder.query !== query) {
    refs.gallery.textContent = '';

    imgFinder.resetPage();
    imgFinder.query = query;
  }

  const fetch = imgFinder.fetchPicture().then(r => {
    refs.gallery.insertAdjacentHTML('beforeend', gallery(r));
  });
  refs.loadMore.style.display = 'block';
});

refs.loadMore.addEventListener('click', e => {
  imgFinder.incrementPage();

  const fetch = imgFinder.fetchPicture().then(r => {
    refs.gallery.insertAdjacentHTML('beforeend', gallery(r));
    window.scrollTo({
      behavior: 'smooth',
      top: window.pageYOffset + document.documentElement.clientHeight - 150,
    });
    // setTimeout(() => {

    // }, 250);
  });
});

refs.toStart.addEventListener('click', e => {
  window.scrollTo({
    behavior: 'smooth',
    top: 0,
  });
});
