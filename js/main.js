import {changeScreen, renderScreen, renderHeader} from './utils/render';
import {onAnswer, onEndGame} from './utils/events';
import store from './store';
import {pubSub} from './pubSub';

const container = document.querySelector(`#main`);

const section = document.createElement(`section`);

section.id = `screen`;

container.appendChild(section);

const {currentScreen} = store.getValues([`currentScreen`]);

renderHeader(currentScreen);
renderScreen(currentScreen, `#screen`);

pubSub.subscribe(`changeScreen`, changeScreen);
pubSub.subscribe(`answer`, onAnswer); // для теста
pubSub.subscribe(`endGame`, onEndGame); // для теста
