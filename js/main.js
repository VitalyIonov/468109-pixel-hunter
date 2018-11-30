import header from './components/header/index';
import content from './components/content/index';

import {render} from './utils/render';
import {changeScreen, changeTimer, onAnswer, nextStage, resetTimer} from './actions';
import store, {initialValues} from './store';

store.initialize(initialValues);

const app = () => {
  return render({
    nodeName: `section`,
    id: `app`,
    className: `app`,
    elements: [header, content]
  });
};

const container = document.querySelector(`#main`);

container.appendChild(app());

store.bindAction(`changeScreen`, changeScreen);
store.bindAction(`changeTimer`, changeTimer);
store.bindAction(`resetTimer`, resetTimer);
store.bindAction(`newAnswer`, onAnswer);
store.bindAction(`nextStage`, nextStage);
