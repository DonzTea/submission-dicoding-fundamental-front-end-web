import "./styles/main.css";

import "./components/header";
import "./components/trailer";
import "./components/home/cards";
import "./components/home/card";
import "./components/discover/card";
import "./components/discover/pagination";

import "./pages/home";
import "./pages/detail";
import "./pages/discover";

class Root extends HTMLElement {
  constructor() {
    super();

    this.componentName = this.tagName.toLocaleLowerCase();

    this.clear = () => {
      this.replaceChildren();
    };

    this.onChangeActivePage = () => {
      this.clear();

      const header = document.createElement("header-component");
      this.appendChild(header);

      const homePage = document.createElement("home-page");
      homePage.classList.add("page");
      const detailPage = document.createElement("detail-page");
      detailPage.classList.add("page");
      const discoverPage = document.createElement("discover-page");
      discoverPage.classList.add("page");

      this.appendChild(homePage);
      this.appendChild(detailPage);
      this.appendChild(discoverPage);

      switch (this.getAttribute("active-page")) {
        case "home":
          homePage.classList.add("active");
          detailPage.classList.remove("active");
          discoverPage.classList.remove("active");
          break;
        case "detail":
          homePage.classList.remove("active");
          detailPage.classList.add("active");
          discoverPage.classList.remove("active");
          break;
        case "discover":
          homePage.classList.remove("active");
          detailPage.classList.remove("active");
          discoverPage.classList.add("active");
          break;
        default:
          homePage.classList.add("active");
          detailPage.classList.remove("active");
          discoverPage.classList.remove("active");
          break;
      }
    };
  }

  static get observedAttributes() {
    return ["active-page"];
  }

  connectedCallback() {
    this.onChangeActivePage();
  }

  attributeChangedCallback() {
    this.onChangeActivePage();
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   this.onChangeActivePage();
  // }

  // adoptedCallback() {}

  // disconnectedCallback() {}
}

customElements.define("root-component", Root);

const root = document.createElement("root-component");
root.setAttribute("active-page", "home");

document.body.appendChild(root);
