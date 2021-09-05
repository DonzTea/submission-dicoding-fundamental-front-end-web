import { getPagination } from '../../utils/pagination';

export default class Pagination extends HTMLElement {
  constructor() {
    super();

    this.componentName = this.tagName.toLocaleLowerCase();
    this.discoverPage = document.querySelector('discover-page');
    this.paginationDataList = [];
  }

  static get observedAttributes() {
    return ['page', 'total-pages'];
  }

  connectedCallback() {
    this.render();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  adoptedCallback() {}

  disconnectedCallback() {
    if (
      Array.isArray(this.paginationDataList) &&
      this.paginationDataList.length > 0
    ) {
      for (let object of this.paginationDataList) {
        object.page.removeEventListener('click', object.onClick);
      }
    }
  }

  render = () => {
    this.replaceChildren();
    this.paginationDataList = [];

    const pagination = getPagination(
      this.getAttribute('page'),
      this.getAttribute('total-pages'),
    );

    for (let pageNumber of pagination) {
      const page = document.createElement('span');
      page.innerText = pageNumber;

      if (pageNumber === '...') page.classList.add('disabled');
      if (pageNumber === parseInt(this.getAttribute('page')))
        page.classList.add('active');

      const onClick = () => {
        this.discoverPage.setAttribute('page', pageNumber);
      };
      page.addEventListener('click', onClick);

      this.paginationDataList.push({
        page,
        onClick,
      });

      this.appendChild(page);
    }
  };
}
