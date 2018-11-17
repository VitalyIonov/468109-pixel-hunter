import arrows from './components/arrows';
import {render, getScreen} from './utils/main';
import {store} from './store';

document.body.appendChild(arrows);

render(0);

document.addEventListener(`keydown`, (event) => {
  const {currentScreen} = store.getValues();

  if (event.keyCode === 37) {
    getScreen(currentScreen - 1);
  }

  if (event.keyCode === 39) {
    getScreen(currentScreen + 1);
  }
});
