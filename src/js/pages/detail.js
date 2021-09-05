import moment from 'moment';

import backArrowIcon from '../../img/back-arrow.svg';
import playIcon from '/src/img/play-icon.svg';
import Trailer from '../components/trailer';
import { getMovieDetail } from '../services/fetch';
import { getBackgroundImageUrl } from '../services/image';

export default class Detail extends HTMLElement {
  constructor() {
    super();

    this.componentName = this.tagName.toLocaleLowerCase();
  }

  static get observedAttributes() {
    return ['movie-id', 'trailer-key', 'refered-from'];
  }

  connectedCallback() {
    this.backButton = document.createElement('img');
    this.backButton.setAttribute('id', 'back-button');
    this.backButton.src = backArrowIcon;
    this.backButton.setAttribute('width', 30);
    this.backButton.addEventListener('click', this.changePage);
    this.appendChild(this.backButton);

    this.titleElement = document.createElement('div');
    this.appendChild(this.titleElement);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'movie-id' && oldValue !== newValue) {
      const result = await getMovieDetail(newValue);

      const backgroundImageUrl = getBackgroundImageUrl(result.backdrop_path);
      this.setBackground(backgroundImageUrl);

      this.replaceChildren();
      this.appendChild(this.backButton);

      const genreList = document.createElement('ul');
      genreList.classList.add('genre-list');
      for (const genre of result.genres) {
        const genreElement = document.createElement('li');
        genreElement.innerText = genre.name;
        genreList.appendChild(genreElement);
      }
      this.appendChild(genreList);

      const title = document.createElement('div');
      title.classList.add('title');
      title.innerText = result.title;
      this.appendChild(title);

      const info = document.createElement('div');
      info.classList.add('info');
      const releaseDate = document.createElement('span');
      releaseDate.innerText = moment(result.release_date).format('D MMMM YYYY');
      info.appendChild(releaseDate);
      const originalLanguage = document.createElement('span');
      originalLanguage.innerText = result.original_language.toUpperCase();
      info.appendChild(originalLanguage);
      this.appendChild(info);

      const overview = document.createElement('p');
      overview.classList.add('overview');
      overview.innerText = result.overview;
      this.appendChild(overview);

      if (this.getAttribute('trailer-key')) {
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        this.playButton = document.createElement('button');
        this.playButton.classList.add('play-button');

        const playButtonIcon = document.createElement('img');
        playButtonIcon.setAttribute('width', 20);
        playButtonIcon.setAttribute('height', 20);
        playButtonIcon.src = playIcon;
        this.playButton.appendChild(playButtonIcon);
        this.playButton.addEventListener('click', this.showTrailer);

        const playButtonText = document.createElement('span');
        playButtonText.innerText = 'Watch Trailer';
        this.playButton.appendChild(playButtonText);

        buttonWrapper.appendChild(this.playButton);
        this.appendChild(buttonWrapper);
      }
    }
  }

  adoptedCallback() {}

  disconnectedCallback() {
    this.backButton.removeEventListener('click', this.changePage);

    if (this.playButton)
      this.playButton.removeEventListener('click', this.showTrailer);
  }

  changePage = () => {
    const root = document.querySelector('root-component');
    root.setAttribute('active-page', this.getAttribute('refered-from'));
  };

  setBackground = (backgroundImageUrl) => {
    const background = document.querySelector('background');
    background.style.backgroundImage = `url('${backgroundImageUrl}')`;
  };

  showTrailer = () => {
    Trailer.showTrailer(this.getAttribute('trailer-key'));
  };
}
