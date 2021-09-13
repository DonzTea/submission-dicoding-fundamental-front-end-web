import "./pagination.css";

import PaginationUtils from "../../utils/pagination";

export default class Pagination extends HTMLElement {
  constructor() {
    super();

    this.componentName = this.tagName.toLocaleLowerCase();
    this.discoverPage = document.querySelector("discover-page");
    this.paginationDataList = [];

    this.render = () => {
      this.replaceChildren();
      this.paginationDataList = [];

      const pagination = PaginationUtils.getPagination(
        this.getAttribute("page"),
        this.getAttribute("total-pages")
      );

      for (let i = 0; i < pagination.length; i += 1) {
        const pageNumber = pagination[i];
        const page = document.createElement("span");
        page.innerText = pageNumber;

        if (pageNumber === "...") page.classList.add("disabled");
        if (pageNumber === parseInt(this.getAttribute("page"), 10))
          page.classList.add("active");

        const onClick = () => {
          this.discoverPage.setAttribute("page", pageNumber);
        };
        page.addEventListener("click", onClick);

        this.paginationDataList.push({
          page,
          onClick,
        });

        this.appendChild(page);
      }
    };
  }

  static get observedAttributes() {
    return ["page", "total-pages"];
  }

  connectedCallback() {
    this.render();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // adoptedCallback() {}

  disconnectedCallback() {
    if (
      Array.isArray(this.paginationDataList) &&
      this.paginationDataList.length > 0
    ) {
      for (let i = 0; i < this.paginationDataList.length; i += 1) {
        const object = this.paginationDataList[i];
        object.page.removeEventListener("click", object.onClick);
      }
    }
  }
}

customElements.define("pagination-component", Pagination);
