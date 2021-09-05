import { getNowPlayingMovies, searchMovies } from '../services/fetch';
import { getPosterImageUrl, getBackgroundImageUrl } from '../services/image';

export default class Discover extends HTMLElement {
  constructor() {
    super();

    this.componentName = this.tagName.toLocaleLowerCase();
    this.paginationItems = [];
  }

  static get observedAttributes() {
    return ['input-value', 'page'];
  }

  async connectedCallback() {
    this.setAttribute('page', 1);

    const searchbar = document.createElement('span');
    searchbar.classList.add('searchbar');
    this.searchInput = document.createElement('input');
    this.searchInput.setAttribute('placeholder', 'Search');
    this.searchInput.setAttribute('autofocus', 'autofocus');
    this.searchInput.addEventListener('input', this.onSearch);
    searchbar.appendChild(this.searchInput);
    this.appendChild(searchbar);

    const cardSection = document.createElement('div');
    const title = document.createElement('div');
    title.classList.add('title');
    title.innerText = 'Playing Now';
    cardSection.appendChild(title);

    this.cardList = document.createElement('div');
    this.cardList.classList.add('card-list');
    const { data, totalPages } = await getNowPlayingMovies(
      this.getAttribute('page'),
    );
    this.fetchedData = data;

    for (let movie of data) {
      const card = document.createElement('discover-card-component');
      card.setAttribute('movie-id', movie.id);
      card.setAttribute(
        'poster-url',
        movie.poster_path
          ? getPosterImageUrl(movie.poster_path)
          : 'https://via.placeholder.com/200x300/000000/FFFFFF/?text=No%20Image',
      );
      card.setAttribute('rating', movie.vote_average);
      this.cardList.appendChild(card);
    }
    cardSection.appendChild(this.cardList);
    this.appendChild(cardSection);

    this.paginationWrapper = document.createElement('pagination-component');
    this.paginationWrapper.setAttribute('page', this.getAttribute('page'));
    this.paginationWrapper.setAttribute('total-pages', totalPages);
    this.appendChild(this.paginationWrapper);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (['input-value', 'page'].includes(name) && oldValue !== newValue) {
      if (this.cardList) this.cardList.replaceChildren();

      if (this.getAttribute('input-value')) {
        const { data, totalPages } = await searchMovies(
          this.getAttribute('page'),
          this.getAttribute('input-value'),
        );
        this.fetchedData = data;

        if (this.paginationWrapper) {
          this.paginationWrapper.setAttribute(
            'page',
            this.getAttribute('page'),
          );
          this.paginationWrapper.setAttribute('total-pages', totalPages);
        }

        for (let movie of data) {
          const card = document.createElement('discover-card-component');
          card.setAttribute('movie-id', movie.id);
          card.setAttribute(
            'poster-url',
            movie.poster_path
              ? getPosterImageUrl(movie.poster_path)
              : 'https://via.placeholder.com/200x300/000000/FFFFFF/?text=No%20Image',
          );
          card.setAttribute('rating', movie.vote_average);
          this.cardList.appendChild(card);
        }
      } else {
        const { data, totalPages } = await getNowPlayingMovies(
          this.getAttribute('page'),
        );
        this.fetchedData = data;

        if (this.paginationWrapper) {
          this.paginationWrapper.setAttribute(
            'page',
            this.getAttribute('page'),
          );
          this.paginationWrapper.setAttribute('total-pages', totalPages);
        }

        for (let movie of data) {
          const card = document.createElement('discover-card-component');
          card.setAttribute('movie-id', movie.id);
          card.setAttribute(
            'poster-url',
            movie.poster_path
              ? getPosterImageUrl(movie.poster_path)
              : 'https://via.placeholder.com/200x300/000000/FFFFFF/?text=No%20Image',
          );
          card.setAttribute('rating', movie.vote_average);
          this.cardList.appendChild(card);
        }
      }
    }
  }

  adoptedCallback() {}

  disconnectedCallback() {
    if (this.searchInput)
      this.searchInput.removeEventListener('input', this.onSearch);
  }

  onSearch = (e) => {
    this.setAttribute('page', 1);
    this.setAttribute('input-value', e.target.value);
  };
}
