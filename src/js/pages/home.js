export default class Home extends HTMLElement {
  constructor() {
    super();
    this.componentName = this.tagName.toLocaleLowerCase();
  }

  static get observedAttributes() {
    return [];
  }

  connectedCallback() {
    const topRatedCardTitle = document.createElement("div");
    topRatedCardTitle.classList.add("card-title");
    topRatedCardTitle.innerHTML = "<span>Top Rated</span>";
    this.appendChild(topRatedCardTitle);

    const topRatedCards = document.createElement("home-cards-component");
    topRatedCards.setAttribute("movie-type", "top rated");
    topRatedCards.setAttribute("visible", "true");
    this.appendChild(topRatedCards);

    const popularCardTitle = document.createElement("div");
    popularCardTitle.classList.add("card-title");
    popularCardTitle.innerHTML = "<span>Popular</span>";
    this.appendChild(popularCardTitle);

    const popularCards = document.createElement("home-cards-component");
    popularCards.setAttribute("movie-type", "popular");
    this.appendChild(popularCards);

    const upcomingCardTitle = document.createElement("div");
    upcomingCardTitle.classList.add("card-title");
    upcomingCardTitle.innerHTML = "<span>Upcoming</span>";
    this.appendChild(upcomingCardTitle);

    const upcomingCards = document.createElement("home-cards-component");
    upcomingCards.setAttribute("movie-type", "upcoming");
    this.appendChild(upcomingCards);
  }

  // attributeChangedCallback(name, oldValue, newValue) {}

  // adoptedCallback() {}

  // disconnectedCallback() {}
}
