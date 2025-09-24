import {
  getData
} from './api.js';
import {
  showError,
  debounce
} from './functions.js';
import {
  onFilterButtonsClick,
  resetFilters
} from './filter.js';
import {
  renderBigPicture
} from './big-picture.js';
import './upload-form-toggle.js';
import './preview-photo.js';
import {
  data as demoData
} from './demo-data.js';

const filterElement = document.querySelector('.img-filters');
const picturesElement = document.querySelector('.pictures');
const DELAY = 500;

const DataSource = {
  REMOTE: 'remote',
  LOCAL: 'local'
};

let currentDataSource = DataSource.REMOTE;
let filterClickHandler;
let pictureClickHandler;

const initializeGallery = (posts) => {
  if (filterClickHandler) {
    filterElement.removeEventListener('click', filterClickHandler);
  }

  if (pictureClickHandler) {
    picturesElement.removeEventListener('click', pictureClickHandler);
  }

  resetFilters(posts);
  filterElement.classList.remove('img-filters--inactive');

  filterClickHandler = debounce(onFilterButtonsClick(posts), DELAY);
  filterElement.addEventListener('click', filterClickHandler);

  pictureClickHandler = renderBigPicture(posts);
  picturesElement.addEventListener('click', pictureClickHandler);
};

const loadLocalData = () => {
  currentDataSource = DataSource.LOCAL;
  initializeGallery(demoData);
};

const loadRemoteData = () => {
  currentDataSource = DataSource.REMOTE;

  getData(
    (posts) => {
      if (currentDataSource !== DataSource.REMOTE) {
        return;
      }

      initializeGallery(posts);
    },
    (errorText) => {
      if (currentDataSource !== DataSource.REMOTE) {
        return;
      }

      const hideReserveNotice = showError(`${errorText} Загружаем резервные данные.`);
      switchDataSource(DataSource.LOCAL);
      setTimeout(hideReserveNotice, 2000);
    }
  );
};

function switchDataSource (source) {
  if (!Object.values(DataSource).includes(source)) {
    return;
  }

  if (source === DataSource.REMOTE) {
    loadRemoteData();
  } else {
    loadLocalData();
  }
}
const parseEnv = (text) => text
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .reduce((acc, line) => {
    const separatorIndex = line.indexOf('=');

    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key) {
      acc[key] = value;
    }

    return acc;
  }, {});

const getConfiguredDataSource = (config) => {
  const source = config.DATA_SOURCE;

  if (typeof source === 'string' && source.trim().toLowerCase() === DataSource.LOCAL) {
    return DataSource.LOCAL;
  }

  return DataSource.REMOTE;
};

const loadConfiguration = async () => {
  try {
    const response = await fetch('./.env', { cache: 'no-store' });

    if (!response.ok) {
      return {};
    }

    const text = await response.text();

    return parseEnv(text);
  } catch (error) {
    return {};
  }
};

const bootstrap = async () => {
  const config = await loadConfiguration();
  const configuredSource = getConfiguredDataSource(config);

  switchDataSource(configuredSource);
};

bootstrap();
