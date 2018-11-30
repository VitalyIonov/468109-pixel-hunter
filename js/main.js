import {render} from './utils/render';
import {changeScreen, changeTimer, onAnswer, nextStage, resetTimer} from './actions';
import store, {initialValues} from './store';

import Intro from './components/intro';
import Greeting from './components/greeting';
import Rules from './components/rules';
import Game1 from './components/game-1';
// import Game2 from './components/content/game-2';
// import Game3 from './components/content/game-3';
import Stats from './components/stats';

const screens = {
  intro: Intro,
  greeting: Greeting,
  rules: Rules,
  game1: Game1,
  // game2: {component: Game2, className: `game`},
  // game3: {component: Game3, className: `game`},
  stats: Stats
};

store.initialize(initialValues);

const App = ({currentScreen}) => {
  return render({
    nodeName: `section`,
    id: `app`,
    className: `central`,
    elements: [screens[currentScreen]]
  });
};

const container = document.querySelector(`#main`);

const connectedApp = store.connect(App, [`currentScreen`]);

container.appendChild(connectedApp());

store.bindAction(`changeScreen`, changeScreen);
store.bindAction(`changeTimer`, changeTimer);
store.bindAction(`resetTimer`, resetTimer);
store.bindAction(`newAnswer`, onAnswer);
store.bindAction(`nextStage`, nextStage);
