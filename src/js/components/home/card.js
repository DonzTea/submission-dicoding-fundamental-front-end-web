import starIcon from "../../../img/star.svg";
import starOutlinedIcon from "../../../img/star-outlined.svg";
import playIcon from "../../../img/play-icon.svg";
import Trailer from "../trailer";
import { getYoutubeTrailerKey } from "../../services/fetch";
import { setActivePage, setDetailPageAttribute } from "../../utils/route";

export default class Card extends HTMLElement {
  constructor() {
    super();
    this.componentName = this.tagName.toLocaleLowerCase();

    this.showTrailer = () => {
      Trailer.showTrailer(this.trailerKey);
    };

    this.openDetail = () => {
      setActivePage("detail");
      setDetailPageAttribute("refered-from", "home");
      setDetailPageAttribute("movie-id", this.getAttribute("movie-id"));
      if (this.trailerKey) {
        setDetailPageAttribute("trailer-key", this.trailerKey);
      }
    };
  }

  static get observedAttributes() {
    return [
      "movie-id",
      "poster-image-url",
      "title",
      "vote-average",
      "vote-count",
      "overview",
      "release-date",
      "popularity",
    ];
  }

  async connectedCallback() {
    this.trailerKey = await getYoutubeTrailerKey(this.getAttribute("movie-id"));

    this.classList.add("card");

    this.imageWrapper = document.createElement("div");
    this.imageWrapper.classList.add("image-wrapper");
    this.imageWrapper.style.backgroundImage = `url('${this.getAttribute(
      "poster-image-url"
    )}')`;
    this.imageWrapper.addEventListener("click", this.openDetail);
    this.appendChild(this.imageWrapper);

    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("content-wrapper");

    const top = document.createElement("div");
    top.classList.add("top");

    this.titleElement = document.createElement("div");
    this.titleElement.classList.add("title");
    this.titleElement.innerHTML = `<span>${
      this.getAttribute("title") || "No Title"
    }</span>`;
    top.appendChild(this.titleElement);
    this.titleElement.firstChild.addEventListener("click", this.openDetail);

    const rating = document.createElement("div");
    rating.classList.add("rating");

    const stars = document.createElement("div");
    const totalStarRating = Math.round(
      parseFloat(this.getAttribute("vote-average")) / 2
    );
    stars.classList.add("stars");
    for (let i = 0; i < 5; i += 1) {
      const star = document.createElement("img");
      star.classList.add("star");
      star.setAttribute("width", 15);
      star.setAttribute("height", 15);

      if (i < totalStarRating) {
        star.src = starIcon;
      } else {
        star.src = starOutlinedIcon;
      }

      stars.appendChild(star);
    }
    rating.appendChild(stars);

    const vote = document.createElement("div");
    vote.classList.add("vote");
    vote.innerText = `${this.getAttribute("vote-count")} voters`;
    rating.appendChild(vote);

    top.appendChild(rating);
    contentWrapper.appendChild(top);

    const mid = document.createElement("div");
    mid.classList.add("mid");
    mid.innerText = this.getAttribute("overview");
    contentWrapper.appendChild(mid);

    const bottom = document.createElement("div");
    bottom.classList.add("bottom");

    const ribbon = document.createElement("div");
    ribbon.classList.add("ribbon");

    const dateSection = document.createElement("div");
    const dateLabel = document.createElement("span");
    dateLabel.innerText = "RELEASE DATE";
    dateSection.appendChild(dateLabel);
    const dateValue = document.createElement("span");
    dateValue.innerText = this.getAttribute("release-date");
    dateSection.appendChild(dateValue);
    ribbon.appendChild(dateSection);

    const popularitySection = document.createElement("div");
    const popularityLabel = document.createElement("span");
    popularityLabel.innerText = "POPULARITY";
    popularitySection.appendChild(popularityLabel);
    const popularityValue = document.createElement("span");
    popularityValue.innerText = this.getAttribute("popularity");
    popularitySection.appendChild(popularityValue);
    ribbon.appendChild(popularitySection);

    const voteSection = document.createElement("div");
    const voteLabel = document.createElement("span");
    voteLabel.innerText = "VOTE AVERAGE";
    voteSection.appendChild(voteLabel);
    const voteValue = document.createElement("span");
    voteValue.innerText = this.getAttribute("vote-average");
    voteSection.appendChild(voteValue);
    ribbon.appendChild(voteSection);

    bottom.appendChild(ribbon);

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");

    if (this.trailerKey) {
      this.playButton = document.createElement("button");
      this.playButton.classList.add("play-button");

      const playButtonIcon = document.createElement("img");
      playButtonIcon.setAttribute("width", 20);
      playButtonIcon.setAttribute("height", 20);
      playButtonIcon.src = playIcon;
      this.playButton.appendChild(playButtonIcon);
      this.playButton.addEventListener("click", this.showTrailer);

      const playButtonText = document.createElement("span");
      playButtonText.innerText = "Watch Trailer";
      this.playButton.appendChild(playButtonText);

      actionButtons.appendChild(this.playButton);
    }

    bottom.appendChild(actionButtons);
    contentWrapper.appendChild(bottom);

    this.appendChild(contentWrapper);
  }

  // attributeChangedCallback(name, oldValue, newValue) {}

  // adoptedCallback() {}

  disconnectedCallback() {
    if (this.playButton)
      this.playButton.removeEventListener("click", this.showTrailer);

    this.imageWrapper.removeEventListener("click", this.openDetail);
    this.titleElement.firstChild.removeEventListener("click", this.openDetail);
  }
}
