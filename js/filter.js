import {
  generateThumbs
} from './thumbs.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const NUMBER_OF_RANDOM_PHOTOS = 12;

const clearThumbs = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

const clearFilterButtonClass = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const resetFilters = (photos) => {
  clearFilterButtonClass();
  filterDefaultButton.classList.add('img-filters__button--active');
  clearThumbs();
  generateThumbs(photos);
};

const viewDefaultPhotos = (photos) => {
  resetFilters(photos);
};

const viewRandomPhotos = (photos) => {
  clearFilterButtonClass();
  filterRandomButton.classList.add('img-filters__button--active');
  clearThumbs();
  const randomPhotos = photos.slice().sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_RANDOM_PHOTOS);
  generateThumbs(randomPhotos);
};

const viewDiscussedPhotos = (photos) => {
  clearFilterButtonClass();
  filterDiscussedButton.classList.add('img-filters__button--active');
  clearThumbs();
  const discussedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  generateThumbs(discussedPhotos);
};

const onFilterButtonsClick = (photos) => (evt) => {
  if (evt.target.matches('#filter-default')) {
    viewDefaultPhotos(photos);
  } else if (evt.target.matches('#filter-random')) {
    viewRandomPhotos(photos);
  } else if (evt.target.matches('#filter-discussed')) {
    viewDiscussedPhotos(photos);
  }
};

export {
  onFilterButtonsClick,
  resetFilters
};
