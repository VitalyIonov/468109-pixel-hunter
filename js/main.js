import {changeScreen, renderScreen, renderHeader} from './utils/render';
import store from './store';
import {pubSub} from './pubSub';

const container = document.querySelector(`#main`);

const section = document.createElement(`section`);

section.id = `screen`;

container.appendChild(section);

const initialScreen = store.getValues(`currentScreen`);

renderHeader(initialScreen);
renderScreen(initialScreen, `#screen`);

pubSub.subscribe(`changeScreen`, changeScreen);
