import '@babel/polyfill';

import {render} from './utils/render';
import {changeScreen, changeTimer, onAnswer, nextStage, resetTimer} from './actions';
import store, {initialValues} from './store';

import SplashScreen from './components/splash';
import ErrorScreen from './components/error';
import Intro from './components/intro';
import Greeting from './components/greeting';
import Rules from './components/rules';
import Game from './components/game';
import Stats from './components/stats';

const Screens = {
  splash: SplashScreen,
  error: ErrorScreen,
  intro: Intro,
  greeting: Greeting,
  rules: Rules,
  game: Game,
  stats: Stats
};

store.initialize(initialValues);

const App = ({currentScreen}) => {
  return render({
    nodeName: `section`,
    id: `app`,
    className: `central`,
    elements: [Screens[currentScreen]],
    isRerender: true
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
