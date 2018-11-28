import Intro from '../components/content/intro';
import Greeting from '../components/content/greeting';
import Rules from '../components/content/rules';
import Game1 from '../components/content/game-1';
// import Game2 from '../components/content/game-2';
// import Game3 from '../components/content/game-3';
import Stats from '../components/content/stats';

import Arrow from '../components/header/arrow';
import Lives from '../components/header/lives';
import Timer from '../components/header/timer';

export const SCREENS = {
  intro: Intro,
  greeting: Greeting,
  rules: Rules,
  game1: Game1,
  // game2: {component: Game2, className: `game`},
  // game3: {component: Game3, className: `game`},
  stats: Stats
};

export const HEADER = [
  {component: Arrow, thereIsInSections: [`rules`, `game1`, `game2`, `game3`, `stats`]},
  {component: Timer, thereIsInSections: [`game1`, `game2`, `game3`]},
  {component: Lives, thereIsInSections: [`game1`, `game2`, `game3`]}
];
