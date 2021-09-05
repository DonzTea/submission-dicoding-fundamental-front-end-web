import moment from 'moment';

import Scroll from '../../utils/scroll';
import {
  getTopRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
} from '../../services/fetch';
import { getBackgroundImageUrl, getPosterImageUrl } from '../../services/image';
import { formatNumberWithThousandSeparator } from '../../utils/number';

export default class Cards extends HTMLElement {
  constructor() {
    super();
    this.componentName = this.tagName.toLocaleLowerCase();
    this.results = [];
    this.root = document.querySelector('root-component');
    this.background = document.querySelector('background');
    this.windowLastY = 0;
  }

  static get observedAttributes() {
    return ['movie-type', 'visible'];
  }

  async connectedCallback() {
    this.cardSection = document.createElement('section');
    this.cardSection.classList.add('cards');

    this.cardSectionScroller = new Scroll(this.cardSection);
    this.cardSectionScroller.listenScrollX();

    try {
      const movieType = this.getAttribute('movie-type');
      if (movieType === 'top rated') {
        const { data } = await getTopRatedMovies();
        this.results = data;
      } else if (movieType === 'popular') {
        const { data } = await getPopularMovies();
        this.results = data;
      } else if (movieType === 'upcoming') {
        const { data } = await getUpcomingMovies();
        this.results = data;
      }
    } catch (error) {
      console.error(error);
    }

    for (let result of this.results) {
      const card = document.createElement('home-card-component');
      card.setAttribute('movie-id', result.id);
      card.setAttribute(
        'poster-image-url',
        getPosterImageUrl(result.poster_path),
      );
      card.setAttribute('title', result.title);
      card.setAttribute('vote-average', result.vote_average);
      card.setAttribute(
        'vote-count',
        formatNumberWithThousandSeparator(result.vote_count),
      );
      card.setAttribute('overview', result.overview);
      card.setAttribute(
        'release-date',
        moment(result.release_date).format('Do MMM YYYY'),
      );
      card.setAttribute(
        'popularity',
        formatNumberWithThousandSeparator(result.popularity),
      );

      this.cardSection.appendChild(card);

      const callback = (entries) => {
        if (
          this.getAttribute('visible') === 'true' &&
          entries[0].isIntersecting
        ) {
          this.background.style.backgroundImage = `url('${getBackgroundImageUrl(
            result.backdrop_path,
          )}')`;
        }
      };

      const cardListObserver = new IntersectionObserver(callback, {
        root: this.cardSection,
        rootMargin: '0px',
        threshold: 1.0,
      });

      cardListObserver.observe(card);
    }

    this.appendChild(this.cardSection);

    window.addEventListener('scroll', this.onWindowScroll);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (
      name === 'visible' &&
      oldValue !== newValue &&
      newValue === 'true' &&
      this.results.length > 0
    ) {
      this.background.style.backgroundImage = `url('${getBackgroundImageUrl(
        this.results[0].backdrop_path,
      )}')`;
    }
  }

  adoptedCallback() {}

  disconnectedCallback() {
    this.cardSectionScroller.unlistenScrollX();
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    if (this.root.getAttribute('active-page') === 'home') {
      const cardConstraint = this.cardSection.getBoundingClientRect();
      const windowY = window.pageYOffset;

      if (windowY > this.windowLastY) {
        const windowBottomGreaterThanCardBottom =
          windowY + window.innerHeight > cardConstraint.bottom;
        this.setAttribute('visible', windowBottomGreaterThanCardBottom);
      } else {
        const cardBottomLessThanWindowTop = cardConstraint.bottom - 150 > 0;
        this.setAttribute('visible', cardBottomLessThanWindowTop);
      }

      this.windowLastY = windowY;
    }
  };
}
