import "./card.css";

import { getYoutubeTrailerKey } from "../../services/fetch";
import { setActivePage, setDetailPageAttribute } from "../../utils/route";
import starIcon from "../../img/star.svg";

export default class Card extends HTMLElement {
  constructor() {
    super();

    this.componentName = this.tagName.toLocaleLowerCase();
    this.render = () => {
      this.style.backgroundImage = `url('${this.getAttribute("poster-url")}')`;

      if (this.getAttribute("rating")) {
        this.replaceChildren();

        const rating = document.createElement("span");
        rating.classList.add("rating");

        const ratingIcon = document.createElement("img");
        ratingIcon.setAttribute("width", 15);
        ratingIcon.setAttribute("height", 15);
        ratingIcon.src = starIcon;
        rating.appendChild(ratingIcon);

        const ratingText = document.createElement("span");
        ratingText.innerText = this.getAttribute("rating");
        rating.appendChild(ratingText);

        this.appendChild(rating);
      }

      this.addEventListener("click", this.openDetail);
    };

    this.openDetail = () => {
      setActivePage("detail");
      setDetailPageAttribute("refered-from", "discover");
      setDetailPageAttribute("movie-id", this.getAttribute("movie-id"));
      if (this.trailerKey) {
        setDetailPageAttribute("trailer-key", this.trailerKey);
      }
    };
  }

  static get observedAttributes() {
    return ["movie-id", "poster-url", "rating"];
  }

  async connectedCallback() {
    this.trailerKey = await getYoutubeTrailerKey(this.getAttribute("movie-id"));

    this.render();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (
      ["movie-id", "poster-url", "rating"].includes(name) &&
      oldValue !== newValue
    ) {
      this.render();
    }
  }

  // adoptedCallback() {}

  disconnectedCallback() {
    this.removeEventListener("click", this.openDetail);
  }
}

customElements.define("discover-card-component", Card);
