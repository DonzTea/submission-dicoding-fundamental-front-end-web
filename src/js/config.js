import '../css/global.css';

import '../css/components/header.css';
import '../css/components/trailer.css';
import '../css/components/home/cards.css';
import '../css/components/home/card.css';
import '../css/components/discover/card.css';
import '../css/components/discover/pagination.css';

import '../css/pages/home.css';
import '../css/pages/detail.css';
import '../css/pages/discover.css';

import Header from './components/header';
import Trailer from './components/trailer';
import HomeCards from './components/home/cards';
import HomeCard from './components/home/card';
import DiscoverCard from './components/discover/card';
import Pagination from './components/discover/pagination';

import Home from './pages/home';
import Detail from './pages/detail';
import Discover from './pages/discover';

customElements.define('header-component', Header);
customElements.define('trailer-component', Trailer);
customElements.define('home-cards-component', HomeCards);
customElements.define('home-card-component', HomeCard);
customElements.define('discover-card-component', DiscoverCard);
customElements.define('pagination-component', Pagination);

customElements.define('home-page', Home);
customElements.define('detail-page', Detail);
customElements.define('discover-page', Discover);
