import Intro from '../components/intro';
import Greeting from '../components/greeting';
import Rules from '../components/rules';
import Game1 from '../components/game-1';
import Game2 from '../components/game-2';
import Game3 from '../components/game-3';
import Stats from '../components/stats';

import {Arrow, arrowListeners, Timer, Lives} from '../components/header/index';

export const SCREENS = {
  intro: {id: 1, component: Intro, className: `intro`},
  greeting: {id: 2, component: Greeting, className: `greeting central--blur`},
  rules: {id: 3, component: Rules, className: `rules`},
  game1: {id: 4, component: Game1, className: `game`},
  game2: {id: 5, component: Game2, className: `game`},
  game3: {id: 6, component: Game3, className: `game`},
  stats: {id: 7, component: Stats, className: `result`}
};

export const HEADER = [
  {component: Arrow, listeners: arrowListeners, thereIsInSections: [`rules`, `game1`, `game2`, `game3`, `stats`]},
  {component: Timer, thereIsInSections: [`game1`, `game2`, `game3`]},
  {component: Lives, thereIsInSections: [`game1`, `game2`, `game3`]}
];
