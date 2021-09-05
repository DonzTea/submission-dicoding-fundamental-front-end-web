export default class Header extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['active-page'];
  }

  connectedCallback() {
    this.navBrand = document.createElement('div');
    this.navBrand.setAttribute('id', 'nav-brand');

    const navBrandPrimary = document.createElement('span');
    navBrandPrimary.classList.add('primary');
    navBrandPrimary.innerText = 'Movie';
    this.navBrand.appendChild(navBrandPrimary);

    const navBrandNeutral = document.createElement('span');
    navBrandNeutral.innerText = 'App';
    this.navBrand.appendChild(navBrandNeutral);

    this.navBrand.addEventListener('click', this.navigateToHome);
    this.appendChild(this.navBrand);

    this.buttonDiscover = document.createElement('button');
    this.buttonDiscover.innerText = 'Discover';
    this.buttonDiscover.addEventListener('click', this.discover);
    this.appendChild(this.buttonDiscover);

    window.addEventListener('scroll', this.onSticky);
  }

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  disconnectedCallback() {
    this.navBrand.removeEventListener('click', this.navigateToHome);
    this.buttonDiscover.removeEventListener('click', this.discover);
  }

  onSticky = (e) => {
    if (window.pageYOffset > 100) {
      this.classList.add('sticky');
    } else {
      this.classList.remove('sticky');
    }
  };

  navigateToHome = () => {
    const root = document.querySelector('root-component');
    root.setAttribute('active-page', 'home');
  };

  discover = () => {
    const root = document.querySelector('root-component');
    root.setAttribute('active-page', 'discover');
  };
}
