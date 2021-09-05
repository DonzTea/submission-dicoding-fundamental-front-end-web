export default class Trailer extends HTMLElement {
  constructor() {
    super();
    this.componentName = this.tagName.toLocaleLowerCase();
  }

  static get observedAttributes() {
    return ['visible', 'youtube-trailer-key'];
  }

  async connectedCallback() {
    this.addEventListener('click', this.hide);

    const youtubePlayer = document.createElement('div');
    youtubePlayer.setAttribute('id', 'youtube-player');
    this.appendChild(youtubePlayer);
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (this.getAttribute('visible') && name === 'youtube-trailer-key') {
      window.player.loadVideoById(newValue);
    }
  }

  adoptedCallback() {}

  disconnectedCallback() {
    this.removeEventListener('click', this.hide);
  }

  hide = (e) => {
    e.preventDefault();
    this.setAttribute('visible', false);
  };

  static showTrailer = (youtubeTrailerKey) => {
    const trailer = document.querySelector('trailer-component');
    trailer.setAttribute('visible', true);
    trailer.setAttribute('youtube-trailer-key', youtubeTrailerKey);
  };
}
